require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Cache = require('./cache');
const { searchAndCompare, scrapeProductDetails } = require('./scraper');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so your React frontend (typically on port 5173) can query this API
app.use(cors({
  origin: '*', // You can restrict this to your frontend URL later, e.g., 'http://localhost:5173'
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Initialize caching layers
const cacheTTL = parseInt(process.env.CACHE_TTL_MINUTES) || 60;
const searchCache = new Cache(cacheTTL);
const productCache = new Cache(cacheTTL);

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

/**
 * Main Product Search and Comparison API
 * GET /api/search?q=mouse+pro+bolt
 */
app.get('/api/search', async (req, res) => {
  const query = req.query.q;

  if (!query || query.trim() === '') {
    return res.status(400).json({ error: 'Search query parameter "q" is required.' });
  }

  const cleanedQuery = query.trim().toLowerCase();

  // 1. Check in-memory cache
  const cachedData = searchCache.get(cleanedQuery);
  if (cachedData) {
    console.log(`[API] Cache hit for search query: "${cleanedQuery}"`);
    return res.json({
      query: cleanedQuery,
      source: 'cache',
      count: cachedData.length,
      products: cachedData
    });
  }

  // 2. Perform live scrape
  try {
    console.log(`[API] Cache miss. Performing live scrape for: "${cleanedQuery}"`);
    const amazonTag = process.env.AMAZON_AFFILIATE_TAG || '';
    const products = await searchAndCompare(cleanedQuery, amazonTag);

    // 3. Store result in cache
    searchCache.set(cleanedQuery, products);

    res.json({
      query: cleanedQuery,
      source: 'live',
      count: products.length,
      products
    });

  } catch (error) {
    console.error('[API] Search error:', error);
    res.status(500).json({ 
      error: 'An error occurred while fetching comparison data from Amazon and Flipkart.',
      details: error.message 
    });
  }
});

/**
 * Product Details Scraping API (On-demand images & specs)
 * GET /api/product?amazonUrl=...&flipkartUrl=...
 */
app.get('/api/product', async (req, res) => {
  const { amazonUrl, flipkartUrl } = req.query;

  if (!amazonUrl && !flipkartUrl) {
    return res.json({ images: [], amazonImages: [], flipkartImages: [] });
  }

  const cacheKey = `${amazonUrl || ''}_${flipkartUrl || ''}`;

  // 1. Check detail cache
  const cachedDetails = productCache.get(cacheKey);
  if (cachedDetails) {
    console.log(`[API] Cache hit for product details.`);
    return res.json(cachedDetails);
  }

  // 2. Perform live detail scrape
  try {
    console.log(`[API] Cache miss. Scraping product details...`);
    const details = await scrapeProductDetails(amazonUrl, flipkartUrl);
    
    // 3. Store in cache
    productCache.set(cacheKey, details);
    
    res.json(details);
  } catch (error) {
    console.error('[API] Product details error:', error);
    res.status(500).json({ 
      error: 'An error occurred while fetching detailed product specs.',
      details: error.message 
    });
  }
});

/**
 * Trending Products API (returns pre-scraped real compared products)
 * GET /api/trending
 */
app.get('/api/trending', (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const trendingPath = path.join(__dirname, 'trending.json');
    if (fs.existsSync(trendingPath)) {
      const data = fs.readFileSync(trendingPath, 'utf-8');
      return res.json(JSON.parse(data));
    }
    res.json([]);
  } catch (error) {
    console.error('[API] Trending products error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(` Cheaprr Comparison Scraper API running on port ${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/api/health`);
  console.log(` Search query: http://localhost:${PORT}/api/search?q=mouse`);
  console.log(`==================================================`);
});

// Periodic cache cleaning (every 10 minutes)
setInterval(() => {
  searchCache.cleanup();
  productCache.cleanup();
}, 10 * 60 * 1000);
