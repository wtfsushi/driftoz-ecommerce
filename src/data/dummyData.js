// Dummy data for the 3D craft shop

export const dummyProducts = [
  {
    id: 1,
    name: "Drift Car Model - Mazda RX-7",
    description: "Highly detailed 3D printed drift car model with moveable wheels and authentic racing decals.",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&h=300&fit=crop",
    category: "Vehicles",
    rating: 4.8,
    inStock: true,
    features: ["High Detail", "Moveable Parts", "Racing Decals"],
    specifications: {
      material: "PLA Plastic",
      scale: "1:24",
      dimensions: "18cm x 8cm x 5cm",
      weight: "150g"
    }
  },
  {
    id: 2,
    name: "Street Racing Helmet",
    description: "Custom 3D printed miniature racing helmet with authentic sponsor stickers and weathering effects.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    category: "Accessories",
    rating: 4.6,
    inStock: true,
    features: ["Detailed Stickers", "Weathered Look", "Authentic Design"]
  },
  {
    id: 3,
    name: "Drift Track Diorama Set",
    description: "Complete miniature drift track with barriers, grandstands, and detailed scenery for your collection.",
    price: 249.99,
    originalPrice: 299.99,
    image: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=400&h=300&fit=crop",
    category: "Dioramas",
    rating: 4.9,
    inStock: true,
    features: ["Complete Set", "Detailed Scenery", "Modular Design"]
  },
  {
    id: 4,
    name: "Turbo Engine Replica",
    description: "Incredibly detailed 3D printed turbo engine with visible internals and moving pistons.",
    price: 124.99,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
    category: "Engines",
    rating: 4.7,
    inStock: true,
    features: ["Moving Parts", "Detailed Internals", "Educational Model"]
  },
  {
    id: 5,
    name: "Custom Spoiler Collection",
    description: "Set of 6 different racing spoilers designed for various car models and racing styles.",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop",
    category: "Parts",
    rating: 4.4,
    inStock: true,
    features: ["6 Different Styles", "Universal Fit", "Aerodynamic Design"]
  },
  {
    id: 6,
    name: "Drift King Figure",
    description: "Articulated driver figure with racing suit, helmet, and multiple poses for your diorama.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
    category: "Figures",
    rating: 4.5,
    inStock: false,
    features: ["Articulated", "Racing Suit", "Multiple Poses"]
  },
  {
    id: 7,
    name: "Neon Underglow Kit",
    description: "LED underglow kit designed specifically for 3D printed car models with battery pack.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    category: "Electronics",
    rating: 4.3,
    inStock: true,
    features: ["LED Lights", "Battery Powered", "Easy Install"]
  },
  {
    id: 8,
    name: "Drift Course Barriers",
    description: "Set of realistic tire barriers and safety cones for creating authentic drift courses.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1471479917193-f00955256257?w=400&h=300&fit=crop",
    category: "Track Parts",
    rating: 4.6,
    inStock: true,
    features: ["Realistic Detail", "Modular System", "Track Building"]
  }
];

export const categories = [
  { id: 'all', name: 'All Products', icon: '🏁' },
  { id: 'vehicles', name: 'Vehicles', icon: '🏎️' },
  { id: 'accessories', name: 'Accessories', icon: '🛠️' },
  { id: 'dioramas', name: 'Dioramas', icon: '🏗️' },
  { id: 'engines', name: 'Engines', icon: '⚙️' },
  { id: 'parts', name: 'Parts', icon: '🔧' },
  { id: 'figures', name: 'Figures', icon: '👤' },
  { id: 'electronics', name: 'Electronics', icon: '💡' },
  { id: 'track-parts', name: 'Track Parts', icon: '🛤️' }
];

export const testimonials = [
  {
    id: 1,
    name: "Alex Rodriguez",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "The attention to detail on these models is incredible! My Mazda RX-7 looks exactly like the real thing.",
    product: "Drift Car Model - Mazda RX-7"
  },
  {
    id: 2,
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Fast shipping and amazing quality. The diorama set transformed my entire display case!",
    product: "Drift Track Diorama Set"
  },
  {
    id: 3,
    name: "Mike Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 4,
    text: "Great customer service and the engine replica is a perfect educational tool for my workshop.",
    product: "Turbo Engine Replica"
  }
];

export const featuredProducts = dummyProducts.slice(0, 4);

export const newArrivals = dummyProducts.slice(4, 8);

export const topRated = [...dummyProducts].sort((a, b) => b.rating - a.rating).slice(0, 4);
