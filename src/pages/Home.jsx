import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import { useCart } from '../context/CartContext';
import { featuredProducts, newArrivals, testimonials } from '../data/dummyData';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { addItem } = useCart();

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Happy Customers', value: '10,000+', icon: '😊' },
    { label: 'Products Sold', value: '50,000+', icon: '📦' },
    { label: 'Countries Served', value: '25+', icon: '🌍' },
    { label: 'Years Experience', value: '5+', icon: '⭐' },
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden ">
        {/* Background Video/Animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-drift-black via-dark-900 to-drift-gray">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-drift-yellow rounded-full opacity-30 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-racing font-bold mb-6">
              <span className="text-gradient neon-text">DRIFT</span>
              <span className="text-white">oZ</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4 font-modern">
              Premium 3D Crafted Racing Models
            </p>
            
            <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
              Experience the thrill of drift racing with our meticulously crafted 3D printed models. 
              From authentic car replicas to complete track dioramas, we bring your racing dreams to life.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 sm:mb-16">
              <Link
                to="/products"
                className="btn-drift text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto transform hover:scale-105 transition-all duration-300"
              >
                🏁 Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-drift-black to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl mb-2 group-hover:animate-bounce">{stat.icon}</div>
                <div className="text-3xl font-racing font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-racing font-bold text-gradient mb-4">
              Featured Collection
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our most popular and highest-rated 3D printed racing models
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addItem}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="btn-drift text-lg px-8 py-4"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-drift-yellow to-drift-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-racing font-bold text-drift-black mb-4">
            Ready to Start Your Collection?
          </h2>
          <p className="text-xl text-drift-black/80 mb-8">
            Join thousands of racing enthusiasts who trust DriftoZ for premium 3D printed models
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-drift-black text-drift-yellow px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-900 transition-colors duration-300 transform hover:scale-105"
          >
            <span>🏁</span>
            <span>Shop Now</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;