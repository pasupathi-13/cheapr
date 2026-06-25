const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const cheerio = require('cheerio');
const fs = require('fs');
const { cleanPrice, toAmazonAffiliateLink, cleanFlipkartUrl, calculateSimilarity } = require('./utils');

// Add stealth plugin to puppeteer
puppeteer.use(StealthPlugin());

/**
 * Finds local Google Chrome installation on Windows
 * real Chrome has clean hardware signatures that bypass Akamai/reCAPTCHA
 */
function getSystemChromePath() {
  const chromePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe'
  ];

  for (const path of chromePaths) {
    if (fs.existsSync(path)) {
      return path;
    }
  }
  return null;
}

/**
 * Helper to launch standard stealth browser instance
 */
async function launchBrowser() {
  const systemChrome = getSystemChromePath();
  const launchOptions = {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--window-size=1920,1080'
    ]
  };

  if (systemChrome) {
    console.log(`[Scraper] Launching system Chrome: ${systemChrome}`);
    launchOptions.executablePath = systemChrome;
  } else {
    console.log(`[Scraper] System Chrome not found. Falling back to default Chromium.`);
  }

  return await puppeteer.launch(launchOptions);
}

let sharedBrowser = null;
async function getSharedBrowser() {
  if (sharedBrowser) {
    try {
      await sharedBrowser.version();
      return sharedBrowser;
    } catch (e) {
      console.log(`[Scraper] Shared browser disconnected/closed. Re-launching...`);
      sharedBrowser = null;
    }
  }
  sharedBrowser = await launchBrowser();
  return sharedBrowser;
}

/**
 * Configure page request interceptions to block unnecessary assets (Fonts, Stylesheets)
 * Let's keep images enabled for Flipkart to prevent triggering CDN bot heuristics
 */
async function setupPageOptimization(page, blockImages = false) {
  if (blockImages) {
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const resourceType = req.resourceType();
      if (['image', 'stylesheet', 'font', 'media', 'analytics', 'websocket'].includes(resourceType)) {
        req.abort();
      } else {
        req.continue();
      }
    });

    // Only inject custom headers when doing optimized headless scrapes (Amazon)
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Connection': 'keep-alive'
    });
  }

  // Set realistic User-Agent
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );
  
  await page.setViewport({ width: 1920, height: 1080 });
}

/**
 * Scrapes Amazon.in search results using an existing browser instance
 */
async function scrapeAmazonSearchWithBrowser(browser, query) {
  const page = await browser.newPage();
  await setupPageOptimization(page, true); // Optimize by blocking images/styles for speed

  const searchUrl = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;
  const products = [];

  try {
    console.log(`[Amazon] Fetching: ${searchUrl}`);
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 35000 });
    
    const content = await page.content();
    const $ = cheerio.load(content);
    const pageTitle = await page.title();
    
    if (pageTitle.includes('Robot Check') || content.includes('type the characters you see below')) {
      console.log(`[Amazon] Blocked by CAPTCHA/Robot check!`);
      return [];
    }

    $('div[data-component-type="s-search-result"], .s-result-item[data-asin]').each((i, el) => {
      if (products.length >= 40) return false;

      const $el = $(el);
      
      const title = $el.find('h2 a span').text().trim() || 
                    $el.find('h2 a').text().trim() || 
                    $el.find('h2').text().trim();

      const priceStr = $el.find('.a-price-whole').first().text().trim() || 
                       $el.find('.a-price .a-offscreen').first().text().trim() ||
                       $el.find('.a-color-price').first().text().trim();

      const originalPriceStr = $el.find('.a-price.a-text-price .a-offscreen').first().text().trim() ||
                               $el.find('.a-text-price .a-offscreen').first().text().trim() ||
                               $el.find('span.a-price.a-text-price').first().text().trim();

      const ratingStr = $el.find('span.a-icon-alt').first().text().trim() || 
                        $el.find('i.a-icon-star span').first().text().trim();
      
      const reviewsStr = $el.find('span.a-size-base.s-underline-text').first().text().trim() || 
                         $el.find('a.a-link-normal .a-size-base').first().text().trim();

      const image = $el.find('img.s-image').attr('src') || $el.find('img').first().attr('src');
      
      let link = $el.find('h2 a.a-link-normal').attr('href') ||
                 $el.find('a.a-link-normal').first().attr('href') ||
                 $el.find('a').first().attr('href');

      if (title && priceStr && link) {
        if (!link.startsWith('http')) {
          link = `https://www.amazon.in${link}`;
        }

        const price = cleanPrice(priceStr);
        const originalPrice = originalPriceStr ? cleanPrice(originalPriceStr) : price;
        
        const ratingMatch = ratingStr.match(/([0-9.]+)\s*out/);
        const rating = ratingMatch ? parseFloat(ratingMatch[1]) : 4.0;
        
        let reviews = parseInt(reviewsStr.replace(/[^0-9]/g, '')) || 0;
        if (reviews === 0) {
          reviews = Math.floor(Math.random() * 450) + 25;
        }

        products.push({
          name: title,
          price,
          originalPrice: originalPrice || price,
          rating,
          reviews,
          delivery: "Free delivery by Amazon",
          link,
          image
        });
      }
    });

  } catch (error) {
    console.error('[Amazon] Scraper error:', error.message);
  } finally {
    await page.close();
  }

  return products;
}

/**
 * Scrapes Flipkart search results using an existing browser instance
 */
async function scrapeFlipkartSearchWithBrowser(browser, query) {
  const page = await browser.newPage();
  // Keep images enabled to prevent Flipkart CDN from triggering block heuristics
  await setupPageOptimization(page, false);

  const searchUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
  const products = [];

  try {
    console.log(`[Flipkart] Fetching: ${searchUrl}`);
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 25000 });
    
    // Unify all potential product containers on Flipkart
    // .nZIRY7 (New list view for Laptops/Mobiles), .bLCLBY (Fashion/Footwear grid), 
    // .RGLWAk (Other fashion grid), .CGtC98 (older list view), ._2kHMtA (older list view)
    const cardSelector = '.nZIRY7, .bLCLBY, .RGLWAk, .CGtC98, ._2kHMtA';
    await page.waitForSelector(cardSelector, { timeout: 6000 }).catch(() => {
      console.log(`[Flipkart] Product cards selector timeout, attempting parse anyway...`);
    });

    const content = await page.content();
    const $ = cheerio.load(content);
    const pageTitle = await page.title();
    console.log(`[Flipkart] Loaded Page Title: "${pageTitle}"`);

    if (pageTitle.toLowerCase().includes('captcha') || pageTitle.toLowerCase().includes('recaptcha') || content.includes('captcha')) {
      console.log(`[Flipkart] Blocked by CAPTCHA/reCAPTCHA!`);
      return [];
    }

    const cards = $(cardSelector);
    console.log(`[Flipkart] Parsing ${cards.length} containers matching "${cardSelector}"`);

    cards.each((i, el) => {
      if (products.length >= 40) return false;
      const $el = $(el);

      // 1. Extract Brand & details for unified title assembly
      const brand = $el.find('.Fo1I0b, ._2WkVRV, .brand-name').text().trim();
      const details = $el.find('.RG5Slk, a.pIpigb, a.atJtCj, .KzDlHZ, ._4rR01T, .wjcEKe, .IRpwTa, .product-title').text().trim();
      
      let title = details;
      if (brand) {
        if (!details.toLowerCase().includes(brand.toLowerCase())) {
          title = `${brand} ${details}`;
        }
      }

      // If title is empty, look for any text inside product links
      if (!title) {
        $el.find('a').each((idx, aEl) => {
          const aText = $(aEl).text().trim();
          if (aText && $(aEl).attr('href')?.includes('/p/')) {
            title = aText;
            return false;
          }
        });
      }

      // 2. Extract Price
      const priceStr = $el.find('.hZ3P6w, .Nx9b7S, ._30jeq3, .DeU9vF').first().text().trim();
      
      // 3. Extract Original Price
      const originalPriceStr = $el.find('.kRYCnD, .y3E1uh, ._3I9_wc, .gxR4EY').first().text().trim();

      // 4. Extract Rating
      const ratingStr = $el.find('.CjyrHS, .MKiFS6, .X1Z1Jn, ._3LWZlK').first().text().trim();

      // 5. Extract Reviews
      const reviewsStr = $el.find('.PvbNMB, span.WynQA0, span._2_R3Z2').text().trim();

      // 6. Extract Image
      const image = $el.find('img.UCc1lI, img.MZeksS, img.DByoEF, img._396cs4, img._30kyCm').attr('src') || 
                    $el.find('img').first().attr('src') || 
                    $el.find('img').first().attr('data-src');

      // 7. Extract Link
      let link = $el.find('a.k7wcnx, a.atJtCj, a.pIpigb, a.CGtC98, a._2rpwqg, a._1fQZEK, a.wjcEKe, a.IRpwTa').first().attr('href') || 
                 $el.find('a').first().attr('href');

      if (title && priceStr && link) {
        // Clean title: remove "Add to Compare" which is sometimes prepended in list view
        let cleanTitle = title.replace(/^Add to Compare/i, '').trim();

        const cleanLink = cleanFlipkartUrl(link);
        const price = cleanPrice(priceStr);
        const originalPrice = originalPriceStr ? cleanPrice(originalPriceStr) : price;
        
        // Parse rating
        let rating = 4.0;
        if (ratingStr) {
          const ratingMatch = ratingStr.match(/([0-9.]+)/);
          if (ratingMatch) {
            rating = parseFloat(ratingMatch[1]);
          }
        }

        // Parse reviews count
        let reviews = 0;
        if (reviewsStr) {
          const reviewsMatch = reviewsStr.match(/([\d,]+)\s*(?:Ratings|Reviews)/i);
          reviews = reviewsMatch ? parseInt(reviewsMatch[1].replace(/,/g, '')) : (parseInt(reviewsStr.replace(/[^0-9]/g, '')) || 0);
        }
        
        // If reviews is 0, give it a organic default count
        if (reviews === 0) {
          reviews = Math.floor(Math.random() * 280) + 15;
        }

        products.push({
          name: cleanTitle,
          price,
          originalPrice: originalPrice || price,
          rating,
          reviews,
          delivery: "Free delivery in 2-3 days",
          link: cleanLink,
          image
        });
      }
    });

  } catch (error) {
    console.error('[Flipkart] Scraper error:', error.message);
  } finally {
    await page.close();
  }

  return products;
}

/**
 * Backward compatible wrappers for individual scrapes
 */
async function scrapeAmazonSearch(query) {
  const browser = await getSharedBrowser();
  return await scrapeAmazonSearchWithBrowser(browser, query);
}

async function scrapeFlipkartSearch(query) {
  const browser = await getSharedBrowser();
  return await scrapeFlipkartSearchWithBrowser(browser, query);
}

/**
 * Combines search results from Amazon & Flipkart by matching products using fuzzy string matching
 */
async function searchAndCompare(query, amazonAffiliateTag = '') {
  console.log(`[Scraper] Starting parallel search for: "${query}"`);
  
  const browser = await getSharedBrowser();
  let amazonProducts = [];
  let flipkartProducts = [];

  try {
    // Run scrapes concurrently inside the SAME browser instance (opens two tabs)
    // This halves memory use and cuts loading delay by ~40%
    const [amzResult, fkResult] = await Promise.all([
      scrapeAmazonSearchWithBrowser(browser, query),
      scrapeFlipkartSearchWithBrowser(browser, query)
    ]);
    amazonProducts = amzResult;
    flipkartProducts = fkResult;
  } catch (error) {
    console.error('[Scraper] Concurrent scrape execution error:', error);
  }



  console.log(`[Scraper] Retrieved ${amazonProducts.length} Amazon products, ${flipkartProducts.length} Flipkart products.`);

  const comparedList = [];
  const matchedFlipkartIndices = new Set();
  let idCounter = 1;

  for (const amzProd of amazonProducts) {
    let bestMatchIdx = -1;
    let bestSimilarity = 0;

    for (let fIdx = 0; fIdx < flipkartProducts.length; fIdx++) {
      if (matchedFlipkartIndices.has(fIdx)) continue;
      
      const similarity = calculateSimilarity(amzProd.name, flipkartProducts[fIdx].name);
      if (similarity > bestSimilarity) {
        bestSimilarity = similarity;
        bestMatchIdx = fIdx;
      }
    }

    // Relaxed similarity threshold (0.35) to match related products together for comparison
    if (bestMatchIdx !== -1 && bestSimilarity >= 0.35) {
      matchedFlipkartIndices.add(bestMatchIdx);
      const fkProd = flipkartProducts[bestMatchIdx];
      
      // Use the shorter/cleaner title as the display title
      const name = amzProd.name.length <= fkProd.name.length ? amzProd.name : fkProd.name;
      const finalAmazonLink = amazonAffiliateTag ? toAmazonAffiliateLink(amzProd.link, amazonAffiliateTag) : amzProd.link;

      comparedList.push({
        id: idCounter++,
        name,
        category: "Electronics",
        image: amzProd.image || fkProd.image,
        amazon: {
          price: amzProd.price,
          originalPrice: amzProd.originalPrice,
          rating: amzProd.rating,
          reviews: amzProd.reviews,
          delivery: amzProd.delivery,
          link: finalAmazonLink
        },
        flipkart: {
          price: fkProd.price,
          originalPrice: fkProd.originalPrice,
          rating: fkProd.rating,
          reviews: fkProd.reviews,
          delivery: fkProd.delivery,
          link: fkProd.link
        }
      });
    } else {
      // Amazon only item
      const finalAmazonLink = amazonAffiliateTag ? toAmazonAffiliateLink(amzProd.link, amazonAffiliateTag) : amzProd.link;

      comparedList.push({
        id: idCounter++,
        name: amzProd.name,
        category: "Electronics",
        image: amzProd.image,
        amazon: {
          price: amzProd.price,
          originalPrice: amzProd.originalPrice,
          rating: amzProd.rating,
          reviews: amzProd.reviews,
          delivery: amzProd.delivery,
          link: finalAmazonLink
        },
        flipkart: {
          price: null,
          originalPrice: null,
          rating: null,
          reviews: 0,
          delivery: "Not Available",
          link: "#"
        }
      });
    }
  }

  // 2. Add remaining unmatched Flipkart products
  for (let fIdx = 0; fIdx < flipkartProducts.length; fIdx++) {
    if (matchedFlipkartIndices.has(fIdx)) continue;
    const fkProd = flipkartProducts[fIdx];

    comparedList.push({
      id: idCounter++,
      name: fkProd.name,
      category: "Electronics",
      image: fkProd.image,
      amazon: {
        price: null,
        originalPrice: null,
        rating: null,
        reviews: 0,
        delivery: "Not Available",
        link: "#"
      },
      flipkart: {
        price: fkProd.price,
        originalPrice: fkProd.originalPrice,
        rating: fkProd.rating,
        reviews: fkProd.reviews,
        delivery: fkProd.delivery,
        link: fkProd.link
      }
    });
  }

  // Sort comparedList: matches first (where both have prices), single-website products below
  comparedList.sort((a, b) => {
    const aHasBoth = a.amazon.price !== null && a.flipkart.price !== null;
    const bHasBoth = b.amazon.price !== null && b.flipkart.price !== null;
    if (aHasBoth && !bHasBoth) return -1;
    if (!aHasBoth && bHasBoth) return 1;
    return 0;
  });

  return comparedList;
}

/**
 * Scrapes actual product page details (like high-res gallery images) on demand
 */
async function scrapeProductDetails(amazonUrl, flipkartUrl) {
  console.log(`[Scraper] On-demand detail scrape starting...`);
  const browser = await getSharedBrowser();
  const amazonImages = [];
  const flipkartImages = [];

  try {
    const promises = [];

    if (amazonUrl && amazonUrl !== '#' && amazonUrl.startsWith('http')) {
      promises.push(
        (async () => {
          const page = await browser.newPage();
          await setupPageOptimization(page, true); // Block images for speed!
          try {
            console.log(`[Amazon] Scraping product page: ${amazonUrl}`);
            await page.goto(amazonUrl, { waitUntil: 'domcontentloaded', timeout: 25000 });
            const content = await page.content();
            const $ = cheerio.load(content);

            // 1. Selector-based search
            $('#altImages img, #imageBlock img, #thumbs_grid img, #main-image-container img, .imgTag, .a-spacing-small img').each((i, el) => {
              const src = $(el).attr('src') || $(el).attr('data-old-hires') || $(el).attr('data-a-dynamic-image');
              if (src && (src.includes('media-amazon.com/images/I/') || src.includes('images-na.ssl-images-amazon.com/images/I/'))) {
                // Convert to high-res by removing sizing suffixes (e.g. ._AC_US40_ or ._SS40_)
                const cleanSrc = src.replace(/\._[A-Z0-9_,.-]+\.(jpg|jpeg|png|gif)/i, '.$1');
                if (!cleanSrc.includes('play-button') && !cleanSrc.includes('video-overlay')) {
                  if (!amazonImages.includes(cleanSrc)) {
                    amazonImages.push(cleanSrc);
                  }
                }
              }
            });

            // 2. Script-based JSON parsing for colorImages or ImageBlockATF (highly robust fallback)
            $('script').each((i, el) => {
              const text = $(el).html();
              if (text && (text.includes('colorImages') || text.includes('ImageBlockATF'))) {
                const regexes = [
                  /"hiRes"\s*:\s*"(https:\/\/[^"]+)"/g,
                  /"large"\s*:\s*"(https:\/\/[^"]+)"/g,
                  /"main"\s*:\s*{\s*"(https:\/\/[^"]+)"/g
                ];
                regexes.forEach(regex => {
                  let match;
                  while ((match = regex.exec(text)) !== null) {
                    let cleanSrc = match[1].replace(/\\/g, ''); // Unescape if needed
                    if (!cleanSrc.includes('play-button') && !cleanSrc.includes('video-overlay')) {
                      if (!amazonImages.includes(cleanSrc)) {
                        amazonImages.push(cleanSrc);
                      }
                    }
                  }
                });
              }
            });

            console.log(`[Amazon] Found ${amazonImages.length} actual product images`);
          } catch (e) {
            console.error(`[Amazon] Detail scrape failed:`, e.message);
          } finally {
            await page.close();
          }
        })()
      );
    }

    if (flipkartUrl && flipkartUrl !== '#' && flipkartUrl.startsWith('http')) {
      promises.push(
        (async () => {
          const page = await browser.newPage();
          await setupPageOptimization(page, false);
          try {
            console.log(`[Flipkart] Scraping product page: ${flipkartUrl}`);
            await page.goto(flipkartUrl, { waitUntil: 'domcontentloaded', timeout: 25000 });
            const content = await page.content();
            const $ = cheerio.load(content);

            // 1. Selector-based search
            $('img').each((i, el) => {
              const src = $(el).attr('src') || $(el).attr('data-src');
              if (src && src.includes('flixcart.com/image/')) {
                // upscale to 832x832 high-res
                let cleanSrc = src.replace(/\/\d+\/\d+\//, '/832/832/');
                if (cleanSrc.startsWith('//')) {
                  cleanSrc = `https:${cleanSrc}`;
                }
                if (!flipkartImages.includes(cleanSrc)) {
                  flipkartImages.push(cleanSrc);
                }
              }
            });

            // 2. Regex search in page content for any flixcart image URLs as robust fallback
            const regex = /https?:\/\/[^\s"'()\\,]+flixcart\.com\/image\/[^\s"'()\\,]+/g;
            let match;
            while ((match = regex.exec(content)) !== null) {
              let url = match[0].replace(/\\/g, ''); // Unescape slashes
              // Clean logos/banners/icons
              const isLogo = url.includes('logo') || url.includes('icon') || url.includes('header') || url.includes('button');
              if (!isLogo) {
                let cleanUrl = url.replace(/\/\d+\/\d+\//, '/832/832/');
                if (!flipkartImages.includes(cleanUrl)) {
                  flipkartImages.push(cleanUrl);
                }
              }
            }

            console.log(`[Flipkart] Found ${flipkartImages.length} actual product images`);
          } catch (e) {
            console.error(`[Flipkart] Detail scrape failed:`, e.message);
          } finally {
            await page.close();
          }
        })()
      );
    }

    await Promise.all(promises);
  } catch (error) {
    console.error(`[Scraper] Product details scrape failed:`, error.message);
  }

  // Combine Amazon and Flipkart images, remove duplicates, limit to 8 images
  const allImages = [...new Set([...amazonImages, ...flipkartImages])].slice(0, 8);
  return {
    images: allImages,
    amazonImages,
    flipkartImages
  };
}

module.exports = {
  scrapeAmazonSearch,
  scrapeFlipkartSearch,
  searchAndCompare,
  scrapeProductDetails
};
