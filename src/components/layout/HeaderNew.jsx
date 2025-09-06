import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Products', href: '/products', icon: '🎨' },
    { name: 'About', href: '/about', icon: '📖' },
    { name: 'Contact', href: '/contact', icon: '📞' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-black/80 backdrop-blur-lg border-b border-drift-yellow/20 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-drift-yellow to-drift-gold rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-glow">
                <div className="text-2xl font-racing font-bold text-drift-black">
                  D
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-2xl font-racing font-bold text-gradient group-hover:scale-105 transition-transform duration-300">
                DRIFT<span className="text-white">oZ</span>
              </span>
              <span className="text-xs text-gray-400 font-modern tracking-wider">
                3D CRAFT STUDIO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 text-sm font-modern font-medium transition-all duration-300 group ${
                  location.pathname === item.href
                    ? 'text-drift-yellow'
                    : 'text-white hover:text-drift-yellow'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-lg group-hover:animate-bounce">{item.icon}</span>
                  <span>{item.name}</span>
                </span>
                
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-drift-yellow to-drift-gold transition-all duration-300 ${
                  location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-3 text-white hover:text-drift-yellow transition-colors duration-300 group"
            >
              <svg className="w-6 h-6 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h12"/>
              </svg>
            </Link>

            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="text-white hover:text-drift-yellow transition-colors duration-300 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn-drift text-sm px-4 py-2"
              >
                Register
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white hover:text-drift-yellow transition-colors duration-300"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-0'
                }`}></span>
                <span className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 translate-y-2.5 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-5'
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible'
        }`}>
          <div className="glass-dark rounded-lg mt-4 p-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  location.pathname === item.href
                    ? 'bg-drift-yellow/20 text-drift-yellow border-l-4 border-drift-yellow'
                    : 'text-white hover:bg-drift-yellow/10 hover:text-drift-yellow'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
