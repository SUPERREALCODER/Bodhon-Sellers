
import { Product, StatItem, PortfolioItem } from './types';

const MOCK_REVIEWS = [
  { id: 1, user: "Ananya S.", rating: 5, comment: "Absolutely stunning. Exceeded my expectations!", date: "2 days ago" },
  { id: 2, user: "Rahul K.", rating: 4, comment: "Good quality, but delivery took a bit longer than expected.", date: "1 week ago" }
];

export const STATS: StatItem[] = [
  { label: "Happy Customers", value: "15,000+", icon: "Users" },
  { label: "Products Sold", value: "42,000+", icon: "ShoppingBag" },
  { label: "Avg. Rating", value: "4.8/5", icon: "Star" },
  { label: "Local Partners", value: "120+", icon: "Handshake" }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    title: "Corporate Gifting - Tech Hub",
    description: "Successfully delivered 500+ customized minimalist watches for a major IT firm's annual celebration.",
    image: "https://placehold.co/600x400?text=Corporate+Bulk+Order",
    tag: "Bulk Fashion",
    stats: "500 Units Sold"
  },
  {
    id: 2,
    title: "Wedding Bakery Catering",
    description: "Provided 2,000+ assorted muffins and mini-cakes for a high-profile destination wedding in Udaipur.",
    image: "https://placehold.co/600x400?text=Wedding+Catering",
    tag: "Event Catering",
    stats: "2k+ Items Sold"
  },
  {
    id: 3,
    title: "Festive Jewelry Collection",
    description: "Sold out our entire 'Temple Jhumka' limited edition series within 48 hours during Diwali 2023.",
    image: "https://placehold.co/600x400?text=Sold+Out+Collection",
    tag: "Sold Out",
    stats: "1.2k Sets Sold"
  }
];

export const PRODUCTS: Product[] = [
  // --- WATCHES ---
  {
    id: 1,
    name: "Luxury Chronograph Rose Gold",
    category: "Fashion",
    subCategory: "Watch",
    price: 12500,
    rating: 4.9,
    image: "https://placehold.co/800?text=Premium+Luxury+Watch",
    description: "Elegant sapphire crystal face with premium leather straps. This timepiece defines luxury and precision, suitable for formal occasions and high-profile events.",
    isPerishable: false,
    tier: "Premium",
    specifications: ["Sapphire Crystal Glass", "Water Resistant 50m", "Swiss Movement", "Genuine Leather Strap"],
    reviews: MOCK_REVIEWS
  },
  {
    id: 2,
    name: "Sport Titan G-Series",
    category: "Fashion",
    subCategory: "Watch",
    price: 1850,
    rating: 4.5,
    image: "https://placehold.co/800?text=Sport+Mid-range+Watch",
    description: "Water resistant, shock-proof, and dual-time display. Built for the adventurous soul who needs durability without compromising on style.",
    isPerishable: false,
    tier: "Mid-range",
    specifications: ["Shock Resistant", "LED Backlight", "Stopwatch", "Multi-alarm Function"],
    reviews: MOCK_REVIEWS
  },
  {
    id: 3,
    name: "Daily Casual Minimalist",
    category: "Fashion",
    subCategory: "Watch",
    price: 499,
    rating: 4.2,
    image: "https://placehold.co/800?text=Budget+Daily+Watch",
    description: "Lightweight and versatile for everyday office wear. A minimalist design that complements any outfit.",
    isPerishable: false,
    tier: "Budget",
    specifications: ["Quartz Movement", "Slim Profile", "Breathable Strap", "Anti-scratch Finish"],
    reviews: MOCK_REVIEWS
  },

  // --- EARRINGS ---
  {
    id: 4,
    name: "Royal Temple Jhumkas",
    category: "Fashion",
    subCategory: "Earring",
    price: 2400,
    rating: 4.8,
    image: "https://placehold.co/800?text=Traditional+Gold+Jhumkas",
    description: "Intricate traditional craftsmanship for festive occasions. Handcrafted with gold-plated finish and pearl accents.",
    isPerishable: false,
    specifications: ["Gold Plated", "Handcrafted", "Nickel Free", "Secure Push Back"],
    reviews: MOCK_REVIEWS
  },
  {
    id: 5,
    name: "Modern Geometric Hoops",
    category: "Fashion",
    subCategory: "Earring",
    price: 350,
    rating: 4.6,
    image: "https://placehold.co/800?text=Modern+Sleek+Hoops",
    description: "Sleek silver-finish minimalist designs for the modern look. These hoops add a touch of sophistication to your daily ensemble.",
    isPerishable: false,
    specifications: ["Sterling Silver Plated", "Lightweight", "Hypoallergenic", "30mm Diameter"],
    reviews: MOCK_REVIEWS
  },

  // --- MUFFINS (FOOD) ---
  {
    id: 6,
    name: "Double Chocolate Lava Muffin",
    category: "Food",
    subCategory: "Bakery",
    price: 120,
    rating: 5.0,
    image: "https://placehold.co/800?text=Choco+Lava+Muffin",
    description: "Rich cocoa base with a melting chocolate core. Best served warm. Our signature bakery item that melts in your mouth.",
    isPerishable: true,
    specifications: ["Eggless", "Premium Belgian Chocolate", "No Preservatives", "Freshly Baked"],
    reviews: [{ id: 1, user: "Foodie Meera", rating: 5, comment: "The best lava muffin in town! So gooey.", date: "Today" }]
  },
  {
    id: 7,
    name: "Wild Blueberry Burst",
    category: "Food",
    subCategory: "Bakery",
    price: 145,
    rating: 4.7,
    image: "https://placehold.co/800?text=Blueberry+Burst+Muffin",
    description: "Fresh farm-picked blueberries in a buttery golden muffin. A perfect balance of sweetness and tartness.",
    isPerishable: true,
    specifications: ["Fresh Blueberries", "High Fiber", "Low Sugar Option", "Butter Infused"],
    reviews: MOCK_REVIEWS
  },
  {
    id: 8,
    name: "Red Velvet Cloud Muffin",
    category: "Food",
    subCategory: "Bakery",
    price: 160,
    rating: 4.9,
    image: "https://placehold.co/800?text=Red+Velvet+Muffin",
    description: "Signature red velvet texture with cream cheese frosting. A heavenly treat for dessert lovers.",
    isPerishable: true,
    specifications: ["Cream Cheese Frosting", "Velvety Texture", "Individually Packed", "Zero Trans Fat"],
    reviews: MOCK_REVIEWS
  }
];
