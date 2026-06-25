export const formatPrice = (price) => {
  if (price === null || price === undefined) return 'N/A';
  return '₹' + Number(price).toLocaleString('en-IN');
};

export const getDiscount = (original, current) => {
  if (!original || !current) return 0;
  return Math.round(((original - current) / original) * 100);
};

export const isLowest = (price, otherPrice) => {
  if (!price) return false;
  if (!otherPrice) return true; // if other price is null, then this is the lowest
  return price < otherPrice;
};

export const generateStableId = (product) => {
  if (!product) return '';
  const amzUrl = product.amazon?.link || '';
  const fkUrl = product.flipkart?.link || '';
  // Combine name and URLs to make it unique and stable
  const source = `${product.name}||${amzUrl}||${fkUrl}`;
  let hash = 0;
  for (let i = 0; i < source.length; i++) {
    const char = source.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return 'prod_' + Math.abs(hash).toString(36);
};

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';