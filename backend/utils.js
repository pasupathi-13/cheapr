/**
 * Utility functions for Cheaprr Scraper Backend
 */

/**
 * Cleans a price string and returns a numeric value
 * @param {string} priceStr 
 * @returns {number|null}
 */
function cleanPrice(priceStr) {
  if (!priceStr) return null;
  // Remove currency symbols (like ₹, $, Rs.), commas, spaces and parse to number
  const cleaned = priceStr.replace(/[^\d.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? null : parsed;
}

/**
 * Extracts Amazon ASIN from URL
 * @param {string} url 
 * @returns {string|null}
 */
function getAmazonAsin(url) {
  if (!url) return null;
  const regex = /\/(?:dp|gp\/product)\/([A-Z0-9]{10})(?:\/|\?|$)/i;
  const match = url.match(regex);
  return match ? match[1] : null;
}

/**
 * Sanitizes and formats an Amazon affiliate link
 * @param {string} url 
 * @param {string} tag 
 * @returns {string}
 */
function toAmazonAffiliateLink(url, tag) {
  const asin = getAmazonAsin(url);
  if (!asin) return url;
  
  const baseDomain = url.includes('amazon.com') ? 'amazon.com' : 'amazon.in';
  return `https://www.${baseDomain}/dp/${asin}?tag=${tag || 'cheaprr-21'}`;
}

/**
 * Sanitizes Flipkart URL by removing tracking query parameters
 * @param {string} url 
 * @returns {string}
 */
function cleanFlipkartUrl(url) {
  if (!url) return '';
  try {
    const formattedUrl = url.startsWith('http') ? url : `https://www.flipkart.com${url}`;
    const parsed = new URL(formattedUrl);
    
    // Keep only important query parameters like product ID 'pid' and listing ID 'lid'
    const cleanParams = new URLSearchParams();
    if (parsed.searchParams.has('pid')) {
      cleanParams.set('pid', parsed.searchParams.get('pid'));
    }
    if (parsed.searchParams.has('lid')) {
      cleanParams.set('lid', parsed.searchParams.get('lid'));
    }

    const searchStr = cleanParams.toString();
    return `https://www.flipkart.com${parsed.pathname}${searchStr ? '?' + searchStr : ''}`;
  } catch (e) {
    return url;
  }
}

/**
 * Calculates string similarity using Sørensen-Dice coefficient combined with 
 * a key-term and model-code intersection booster for e-commerce accuracy.
 * @param {string} first 
 * @param {string} second 
 * @returns {number} 0 to 1 similarity
 */
function calculateSimilarity(first, second) {
  if (!first || !second) return 0;
  
  const clean = (str) => str.replace(/[^\w\s]/gi, '').toLowerCase().trim();
  const s1 = clean(first);
  const s2 = clean(second);
  
  if (s1 === s2) return 1;

  // 1. Calculate Standard Dice Coefficient
  const getBigrams = (str) => {
    const bigrams = new Set();
    for (let i = 0; i < str.length - 1; i++) {
      bigrams.add(str.substring(i, i + 2));
    }
    return bigrams;
  };

  const bigrams1 = getBigrams(s1);
  const bigrams2 = getBigrams(s2);
  
  let intersection = 0;
  for (const val of bigrams1) {
    if (bigrams2.has(val)) intersection++;
  }
  const dice = (2.0 * intersection) / (bigrams1.size + bigrams2.size);

  // 2. Perform Keyword/Model Token extraction
  const words1 = s1.split(/\s+/);
  const words2 = s2.split(/\s+/);
  
  // Ignore descriptive SEO and filler terms
  const noise = new Set([
    'for', 'and', 'with', 'of', 'the', 'in', 'to', 'men', 'women', 'boys', 'girls', 'unisex', 'adults',
    'waterproof', 'comfortable', 'lightweight', 'cushioned', 'slip', 'on', 'clogs', 'mouse', 'wired',
    'wireless', 'bluetooth', 'optical', 'gaming', 'tracking', 'usb', 'original', 'pack', 'of', 'gaming',
    'ergonomic', 'rechargeable', 'battery', 'device', 'brand', 'design', 'ambidextrous', 'button', 'buttons',
    'scrolling', 'fast', 'silent', 'clicks', 'easy', 'switch', 'compatible', 'laptop', 'pc', 'mac'
  ]);
  
  const keyTerms1 = words1.filter(w => w.length > 2 && !noise.has(w));
  const keyTerms2 = words2.filter(w => w.length > 2 && !noise.has(w));
  
  const shorter = keyTerms1.length <= keyTerms2.length ? keyTerms1 : keyTerms2;
  const longer = keyTerms1.length > keyTerms2.length ? keyTerms1 : keyTerms2;
  
  if (shorter.length === 0) return dice;

  const longerSet = new Set(longer);
  let matchedKeys = 0;
  for (const key of shorter) {
    if (longerSet.has(key)) matchedKeys++;
  }
  
  const keyMatchRatio = matchedKeys / shorter.length;
  
  // If numeric model code exists in both (like G102, M220, MX 3S) and matches, it's a strong signal
  const modelCode1 = words1.find(w => /\d/.test(w) && w.length > 1);
  const modelCode2 = words2.find(w => /\d/.test(w) && w.length > 1);
  
  let modelMatch = false;
  if (modelCode1 && modelCode2 && modelCode1 === modelCode2) {
    modelMatch = true;
  }

  // Boost matched pairs that share a model number and share key words
  if (modelMatch && keyMatchRatio >= 0.5) {
    return 0.85; 
  }

  // Boost products that share high keyword overlap
  if (keyMatchRatio >= 0.70) {
    return Math.max(dice, keyMatchRatio);
  }
  
  return dice;
}

module.exports = {
  cleanPrice,
  getAmazonAsin,
  toAmazonAffiliateLink,
  cleanFlipkartUrl,
  calculateSimilarity
};
