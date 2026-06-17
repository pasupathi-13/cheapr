// src/data/mockData.js

export const categories = [
  { id: 1, name: "Fashion", icon: "👗" },
  { id: 2, name: "Mobiles", icon: "📱" },
  { id: 3, name: "Beauty", icon: "💄" },
  { id: 4, name: "Electronics", icon: "💻" },
  { id: 5, name: "Home", icon: "🏠" },
  { id: 6, name: "Appliances", icon: "🔌" },
  { id: 7, name: "Toys & Baby", icon: "🧸" },
  { id: 8, name: "Food & Health", icon: "🍎" },
  { id: 9, name: "Auto Accessories", icon: "🚗" },
  { id: 10, name: "2 Wheelers", icon: "🏍️" },
  { id: 11, name: "Sports & Fitness", icon: "⚽" },
  { id: 12, name: "Books & Stationery", icon: "📚" },
  { id: 13, name: "Furniture", icon: "🪑" },
  { id: 14, name: "Travel & Luggage", icon: "🧳" },
  { id: 15, name: "Gaming", icon: "🎮" },
  { id: 16, name: "Cameras", icon: "📷" },
];

// All products with category assignments
export const allProducts = [
  // ===== MOBILES (6 products) =====
  {
    id: 1,
    name: "Samsung Galaxy S24 Ultra",
    category: "Mobiles",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300",
    amazon: {
      price: 124999,
      originalPrice: 134999,
      rating: 4.5,
      reviews: 2341,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 119999,
      originalPrice: 134999,
      rating: 4.3,
      reviews: 1876,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 2,
    name: "Apple iPhone 15 Pro Max",
    category: "Mobiles",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300",
    amazon: {
      price: 79999,
      originalPrice: 84999,
      rating: 4.7,
      reviews: 5432,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 81999,
      originalPrice: 84999,
      rating: 4.6,
      reviews: 4321,
      delivery: "Free delivery tomorrow",
      link: "#"
    }
  },
  {
    id: 5,
    name: "OnePlus 12 5G",
    category: "Mobiles",
    image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=300",
    amazon: {
      price: 64999,
      originalPrice: 69999,
      rating: 4.4,
      reviews: 876,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 62999,
      originalPrice: 69999,
      rating: 4.3,
      reviews: 654,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 6,
    name: "Realme Narzo 70 Pro",
    category: "Mobiles",
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=300",
    amazon: {
      price: 19999,
      originalPrice: 24999,
      rating: 4.2,
      reviews: 432,
      delivery: "Free delivery in 2 days",
      link: "#"
    },
    flipkart: {
      price: 18999,
      originalPrice: 24999,
      rating: 4.1,
      reviews: 321,
      delivery: "Free delivery tomorrow",
      link: "#"
    }
  },
  {
    id: 11,
    name: "Google Pixel 8 Pro",
    category: "Mobiles",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300",
    amazon: {
      price: 69999,
      originalPrice: 79999,
      rating: 4.4,
      reviews: 765,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 67999,
      originalPrice: 79999,
      rating: 4.3,
      reviews: 543,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 17,
    name: "Vivo X100 Pro",
    category: "Mobiles",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300",
    amazon: {
      price: 89999,
      originalPrice: 99999,
      rating: 4.3,
      reviews: 432,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 87999,
      originalPrice: 99999,
      rating: 4.2,
      reviews: 321,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },

  // ===== ELECTRONICS (6 products) =====
  {
    id: 4,
    name: "MacBook Air M2",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1611186871525-6d580a3a8b3e?w=300",
    amazon: {
      price: 99999,
      originalPrice: 114900,
      rating: 4.8,
      reviews: 1234,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 97999,
      originalPrice: 114900,
      rating: 4.7,
      reviews: 987,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 7,
    name: "Dell XPS 15 Laptop",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300",
    amazon: {
      price: 89999,
      originalPrice: 99999,
      rating: 4.5,
      reviews: 567,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 87999,
      originalPrice: 99999,
      rating: 4.4,
      reviews: 432,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 8,
    name: "iPad Pro 12.9-inch",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300",
    amazon: {
      price: 89900,
      originalPrice: 99900,
      rating: 4.7,
      reviews: 876,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 87900,
      originalPrice: 99900,
      rating: 4.6,
      reviews: 654,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 12,
    name: "Asus ROG Gaming Laptop",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300",
    amazon: {
      price: 119999,
      originalPrice: 139999,
      rating: 4.6,
      reviews: 456,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 115999,
      originalPrice: 139999,
      rating: 4.5,
      reviews: 345,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 18,
    name: "Samsung Galaxy Tab S9",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1607251588429-3e9ad1c3a78d?w=300",
    amazon: {
      price: 79999,
      originalPrice: 89999,
      rating: 4.6,
      reviews: 345,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 77999,
      originalPrice: 89999,
      rating: 4.5,
      reviews: 234,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 19,
    name: "HP Spectre x360",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300",
    amazon: {
      price: 109999,
      originalPrice: 129999,
      rating: 4.7,
      reviews: 567,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 107999,
      originalPrice: 129999,
      rating: 4.6,
      reviews: 432,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },

  // ===== AUDIO (6 products) =====
  {
    id: 3,
    name: "Sony WH-1000XM5 Headphones",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300",
    amazon: {
      price: 26990,
      originalPrice: 34990,
      rating: 4.6,
      reviews: 3210,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 27990,
      originalPrice: 34990,
      rating: 4.4,
      reviews: 2100,
      delivery: "Free delivery in 3 days",
      link: "#"
    }
  },
  {
    id: 9,
    name: "Bose QuietComfort 45",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
    amazon: {
      price: 24990,
      originalPrice: 29990,
      rating: 4.5,
      reviews: 1234,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 23990,
      originalPrice: 29990,
      rating: 4.3,
      reviews: 987,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 20,
    name: "JBL Flip 6 Speaker",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300",
    amazon: {
      price: 7999,
      originalPrice: 9999,
      rating: 4.4,
      reviews: 876,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 7499,
      originalPrice: 9999,
      rating: 4.3,
      reviews: 654,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 21,
    name: "Samsung Galaxy Buds 2 Pro",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300",
    amazon: {
      price: 14999,
      originalPrice: 19999,
      rating: 4.5,
      reviews: 543,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 13999,
      originalPrice: 19999,
      rating: 4.4,
      reviews: 432,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 22,
    name: "Apple AirPods Pro 2",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300",
    amazon: {
      price: 24999,
      originalPrice: 29999,
      rating: 4.8,
      reviews: 1234,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 23999,
      originalPrice: 29999,
      rating: 4.7,
      reviews: 987,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 23,
    name: "Marshall Major IV Headphones",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300",
    amazon: {
      price: 14999,
      originalPrice: 19999,
      rating: 4.3,
      reviews: 345,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 13999,
      originalPrice: 19999,
      rating: 4.2,
      reviews: 234,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },

  // ===== TVs (5 products) =====
  {
    id: 10,
    name: "LG OLED C3 65-inch TV",
    category: "TVs",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300",
    amazon: {
      price: 149999,
      originalPrice: 169999,
      rating: 4.8,
      reviews: 234,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 145999,
      originalPrice: 169999,
      rating: 4.7,
      reviews: 198,
      delivery: "Free delivery in 3 days",
      link: "#"
    }
  },
  {
    id: 24,
    name: "Samsung QLED 55-inch TV",
    category: "TVs",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300",
    amazon: {
      price: 89999,
      originalPrice: 109999,
      rating: 4.6,
      reviews: 456,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 87999,
      originalPrice: 109999,
      rating: 4.5,
      reviews: 345,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 25,
    name: "Sony Bravia 65-inch 4K TV",
    category: "TVs",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300",
    amazon: {
      price: 129999,
      originalPrice: 149999,
      rating: 4.7,
      reviews: 567,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 127999,
      originalPrice: 149999,
      rating: 4.6,
      reviews: 432,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 26,
    name: "TCL 50-inch 4K Smart TV",
    category: "TVs",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300",
    amazon: {
      price: 39999,
      originalPrice: 49999,
      rating: 4.3,
      reviews: 876,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 37999,
      originalPrice: 49999,
      rating: 4.2,
      reviews: 654,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 27,
    name: "OnePlus Q1 Pro 55-inch TV",
    category: "TVs",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300",
    amazon: {
      price: 69999,
      originalPrice: 79999,
      rating: 4.4,
      reviews: 345,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 67999,
      originalPrice: 79999,
      rating: 4.3,
      reviews: 234,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },

  // ===== FASHION (5 products) =====
  {
    id: 28,
    name: "Levi's Jeans - Classic Fit",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300",
    amazon: {
      price: 2999,
      originalPrice: 3999,
      rating: 4.4,
      reviews: 567,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 2799,
      originalPrice: 3999,
      rating: 4.3,
      reviews: 432,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 29,
    name: "Nike Air Max Shoes",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
    amazon: {
      price: 7999,
      originalPrice: 9999,
      rating: 4.6,
      reviews: 876,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 7699,
      originalPrice: 9999,
      rating: 4.5,
      reviews: 654,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 30,
    name: "Puma T-Shirt - Men",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
    amazon: {
      price: 1199,
      originalPrice: 1499,
      rating: 4.2,
      reviews: 1234,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 1099,
      originalPrice: 1499,
      rating: 4.1,
      reviews: 987,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 31,
    name: "Ray-Ban Sunglasses",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300",
    amazon: {
      price: 5999,
      originalPrice: 7999,
      rating: 4.7,
      reviews: 432,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 5799,
      originalPrice: 7999,
      rating: 4.6,
      reviews: 321,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 32,
    name: "Adidas Jacket - Women",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=300",
    amazon: {
      price: 3499,
      originalPrice: 4999,
      rating: 4.3,
      reviews: 567,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 3299,
      originalPrice: 4999,
      rating: 4.2,
      reviews: 432,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },

  // ===== HOME & FURNITURE (5 products each) =====
  {
    id: 33,
    name: "Sofa Set - 3 Seater",
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300",
    amazon: {
      price: 24999,
      originalPrice: 29999,
      rating: 4.5,
      reviews: 234,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 23999,
      originalPrice: 29999,
      rating: 4.4,
      reviews: 198,
      delivery: "Free delivery in 3 days",
      link: "#"
    }
  },
  {
    id: 34,
    name: "Wooden Dining Table",
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=300",
    amazon: {
      price: 14999,
      originalPrice: 19999,
      rating: 4.3,
      reviews: 345,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 13999,
      originalPrice: 19999,
      rating: 4.2,
      reviews: 234,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 35,
    name: "King Size Bed - Upholstered",
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1552769928-4dfbde6b7b1f?w=300",
    amazon: {
      price: 39999,
      originalPrice: 49999,
      rating: 4.6,
      reviews: 123,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 38999,
      originalPrice: 49999,
      rating: 4.5,
      reviews: 98,
      delivery: "Free delivery in 3 days",
      link: "#"
    }
  },
  {
    id: 36,
    name: "Bookshelf - 5 Tier",
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a7bc?w=300",
    amazon: {
      price: 7999,
      originalPrice: 9999,
      rating: 4.2,
      reviews: 456,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 7499,
      originalPrice: 9999,
      rating: 4.1,
      reviews: 345,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 37,
    name: "Office Chair - Ergonomic",
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=300",
    amazon: {
      price: 8999,
      originalPrice: 11999,
      rating: 4.4,
      reviews: 567,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 8799,
      originalPrice: 11999,
      rating: 4.3,
      reviews: 432,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },

  // ===== HOME APPLIANCES (5 products) =====
  {
    id: 38,
    name: "LG Front Load Washing Machine",
    category: "Appliances",
    image: "https://images.unsplash.com/photo-1626806787461-102c1a3f0c0f?w=300",
    amazon: {
      price: 32999,
      originalPrice: 39999,
      rating: 4.6,
      reviews: 234,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 31999,
      originalPrice: 39999,
      rating: 4.5,
      reviews: 198,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 39,
    name: "Samsung Refrigerator 3-Door",
    category: "Appliances",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300",
    amazon: {
      price: 45999,
      originalPrice: 49999,
      rating: 4.5,
      reviews: 345,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 44999,
      originalPrice: 49999,
      rating: 4.4,
      reviews: 234,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 40,
    name: "Philips Air Purifier",
    category: "Appliances",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300",
    amazon: {
      price: 19999,
      originalPrice: 24999,
      rating: 4.3,
      reviews: 456,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 18999,
      originalPrice: 24999,
      rating: 4.2,
      reviews: 345,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 41,
    name: "Microwave Oven - Convection",
    category: "Appliances",
    image: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=300",
    amazon: {
      price: 12999,
      originalPrice: 15999,
      rating: 4.4,
      reviews: 567,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 11999,
      originalPrice: 15999,
      rating: 4.3,
      reviews: 432,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },
  {
    id: 42,
    name: "Dyson Vacuum Cleaner",
    category: "Appliances",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=300",
    amazon: {
      price: 34999,
      originalPrice: 39999,
      rating: 4.7,
      reviews: 234,
      delivery: "Free delivery tomorrow",
      link: "#"
    },
    flipkart: {
      price: 33999,
      originalPrice: 39999,
      rating: 4.6,
      reviews: 198,
      delivery: "Free delivery in 2 days",
      link: "#"
    }
  },

  // ===== ADDITIONAL CATEGORIES (shortened for brevity – you can expand) =====
  // For categories without 5 products, we'll show a message "More products coming soon"
];

// For backward compatibility, export trendingProducts as all products
export const trendingProducts = allProducts;

// For search results (already included in allProducts)
export const searchMockResults = allProducts.slice(0, 6); // just a subset

export const carouselSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    badge: '🔥 LIMITED TIME',
    title: 'Biggest Sale of the Year',
    subtitle: 'Up to 70% off on top brands',
    cta: 'Shop Now',
    ctaLink: '/search?q=deals',
    alt: 'Big Sale Banner',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1200&q=80',
    badge: '⭐ TOP BRANDS',
    title: 'Premium Electronics at Best Prices',
    subtitle: 'Samsung, Apple, Sony & more',
    cta: 'Explore',
    ctaLink: '/search?q=electronics',
    alt: 'Electronics Sale',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&q=80',
    badge: '💰 BANK OFFER',
    title: 'Up to 10% Instant Discount',
    subtitle: 'with Axis Bank, HDFC & ICICI',
    cta: 'View Offers',
    ctaLink: '/search?q=bank+offers',
    alt: 'Bank Offers',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1607083206869-4c6d2b2b3b1b?w=1200&q=80',
    badge: '🎯 WIDE SELECTION',
    title: 'Everything You Need',
    subtitle: 'Mobiles, Laptops, TVs, Audio & more',
    cta: 'Shop All',
    ctaLink: '/home',
    alt: 'Wide Selection',
  },
];