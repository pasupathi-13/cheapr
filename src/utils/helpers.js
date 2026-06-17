export const formatPrice = (price) => {
  return '₹' + price.toLocaleString('en-IN');
};

export const getDiscount = (original, current) => {
  if (original === 0) return 0;
  return Math.round(((original - current) / original) * 100);
};

export const isLowest = (price, otherPrice) => {
  return price < otherPrice;
};