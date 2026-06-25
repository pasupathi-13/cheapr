// src/data/configData.js

export const categories = [
  { id: 1, name: "Smartphones", searchQuery: "iphone", image: "/images/categories/smartphone.png" },
  { id: 2, name: "Laptops", searchQuery: "macbook air", image: "/images/categories/laptop.png" },
  { id: 3, name: "Watches", searchQuery: "watch", image: "/images/categories/watch.png" },
  { id: 4, name: "Headphones", searchQuery: "buds", image: "/images/categories/headphones.png" },
  { id: 5, name: "Clogs & Crocs", searchQuery: "crocs", image: "/images/categories/clogs.png" },
  { id: 6, name: "Gaming Gear", searchQuery: "logitech", image: "/images/categories/gaming.png" },
];

export const carouselSlides = [
  {
    id: 1,
    image: '/images/slider/slide_compare.png',
    badge: '🔍 COMPARE & SAVE',
    title: 'Dual-Site Price Comparison',
    subtitle: 'Instantly compare identical items across Amazon & Flipkart side-by-side',
    cta: 'Compare iPhones',
    ctaLink: '/search?q=iphone',
    alt: 'Price Comparison Slide',
  },
  {
    id: 2,
    image: '/images/slider/slide_smart.png',
    badge: '💡 SMART SEARCH',
    title: 'Track Lowest Prices Instantly',
    subtitle: 'Advanced Sørensen-Dice boosters verify exact matches and savings',
    cta: 'Explore Laptops',
    ctaLink: '/search?q=macbook+air',
    alt: 'Smart Search Slide',
  },
  {
    id: 3,
    image: '/images/slider/slide_realtime.png',
    badge: '⚡ REALTIME SCRAPING',
    title: 'Real-Time Live Web Crawler',
    subtitle: 'Parallel tab loading crawls listing pages for active details in under 4 seconds',
    cta: 'Browse Watches',
    ctaLink: '/search?q=watch',
    alt: 'Realtime Scraping Slide',
  },
];
