import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCardModern from '../components/common/ProductCardModern';
import { useCart } from '../context/CartContext';
import { featuredProducts, newArrivals, testimonials } from '../data/dummyData';
import heroVideo from '../photo-videos/bmw-lights-vid.mp4';

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
    { label: 'Happy Customers', value: '10,000+', icon: '😊', color: 'from-blue-400 to-blue-600' },
    { label: 'Products Sold', value: '50,000+', icon: '📦', color: 'from-green-400 to-green-600' },
    { label: 'Countries Served', value: '25+', icon: '🌍', color: 'from-purple-400 to-purple-600' },
    { label: 'Years Experience', value: '5+', icon: '⭐', color: 'from-accent-400 to-accent-600' },
  ];

  return (
    <div className="min-h-screen -mt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0">
          {/* Full-bleed background video */}
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none select-none mt-10"
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />

          {/* Semi-transparent gradient overlay to let video show through */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40"></div>

          {/* Soft vignette for readability */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(1200px 600px at 50% 30%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.45) 100%)',
            }}
          />
          
          {/* Animated Mesh */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/20 rounded-full filter blur-3xl animate-float"></div>
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
          </div>
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-500 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-accent-500 rounded-full mr-2 animate-pulse"></span>
              Premium 3D Crafted Models
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-tight">
              <span className="text-gradient text-glow">DRIFT</span>
              <span className="text-white">oZ</span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-300 font-body font-normal">
                3D Craft Studio
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-400 mb-6 max-w-3xl mx-auto font-body leading-relaxed">
              Experience the thrill of precision engineering with our meticulously crafted 3D printed models. 
              From authentic car replicas to complete racing dioramas.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <Link
                to="/products"
                className="btn btn-primary text-lg px-8 py-4 w-full sm:w-auto"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Explore Collection
              </Link>
              <Link
                to="/about"
                className="btn btn-secondary text-lg px-8 py-4 w-full sm:w-auto"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Learn More
              </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="animate-bounce">
              <svg className="w-6 h-6 mx-auto text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-display font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-neutral-400 font-body font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-500 text-sm font-medium mb-6">
              ⭐ Featured Collection
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
              Premium 3D Models
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-body">
              Discover our hand-picked selection of the finest 3D printed racing models and accessories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCardModern 
                key={product.id} 
                product={product} 
                onAddToCart={(product) => addItem(product)}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/products"
              className="btn btn-secondary px-8 py-3"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-500 text-sm font-medium mb-6">
              💬 Customer Reviews
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
              What Our Customers Say
            </h2>
          </div>

          <div className="card glass text-center p-8 md:p-12">
            <div className="mb-6">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl text-neutral-300 font-body leading-relaxed mb-6">
                "{testimonials[currentTestimonial]?.comment}"
              </blockquote>
              <div>
                <div className="font-display font-bold text-white text-lg">
                  {testimonials[currentTestimonial]?.name}
                </div>
                <div className="text-neutral-400 font-body">
                  {testimonials[currentTestimonial]?.title}
                </div>
              </div>
            </div>

            {/* Testimonial indicators */}
            <div className="flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-accent-500 scale-125' 
                      : 'bg-neutral-600 hover:bg-neutral-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card glass p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient mb-6">
              Ready to Start Your Collection?
            </h2>
            <p className="text-xl text-neutral-400 mb-8 font-body">
              Join thousands of satisfied customers and bring your racing dreams to life with our premium 3D models.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/products"
                className="btn btn-primary text-lg px-8 py-4 w-full sm:w-auto"
              >
                Shop Now
              </Link>
              <Link
                to="/contact"
                className="btn btn-secondary text-lg px-8 py-4 w-full sm:w-auto"
              >
                Get Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
