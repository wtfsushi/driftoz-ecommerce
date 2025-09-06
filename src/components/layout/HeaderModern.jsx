import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Products', href: '/products', icon: '🛍️' },
    { name: 'About', href: '/about', icon: '📖' },
    { name: 'Contact', href: '/contact', icon: '📞' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-background-primary/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 shadow-glow group-hover:shadow-glow-lg">
                <div className="text-2xl font-display font-bold text-white">
                  D
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-2xl font-display font-bold text-gradient group-hover:scale-105 transition-transform duration-300">
                DRIFT<span className="text-white">oZ</span>
              </span>
              <span className="text-xs text-neutral-400 font-body tracking-wider">
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
                className={`nav-link group flex items-center space-x-2 ${
                  location.pathname === item.href ? 'text-accent-500' : ''
                }`}
              >
                <span className="text-lg group-hover:animate-bounce-soft">{item.icon}</span>
                <span className="font-body font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="hidden sm:flex items-center justify-center w-10 h-10 text-neutral-400 hover:text-accent-500 transition-colors duration-300 rounded-xl hover:bg-white/5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center w-10 h-10 text-neutral-400 hover:text-accent-500 transition-all duration-300 rounded-xl hover:bg-white/5 group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h12"/>
              </svg>
              {/* Cart badge */}
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </Link>

            {/* User Actions */}
            <div className="hidden sm:flex items-center space-x-3">
              <Link
                to="/login"
                className="text-neutral-400 hover:text-accent-500 transition-colors duration-300 font-medium font-body"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary text-sm px-4 py-2"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-accent-500 transition-all duration-300 rounded-xl hover:bg-white/5"
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
        <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 visible pb-6' 
            : 'max-h-0 opacity-0 invisible pb-0'
        }`}>
          <div className="glass-dark rounded-2xl mt-4 p-6 space-y-4">
            {/* Mobile Navigation Links */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                  location.pathname === item.href
                    ? 'bg-accent-500/20 text-accent-500 border-l-4 border-accent-500'
                    : 'text-neutral-300 hover:bg-white/5 hover:text-accent-500'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-body font-medium">{item.name}</span>
              </Link>
            ))}
            
            {/* Mobile User Actions */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-4 px-4 py-3 rounded-xl text-neutral-300 hover:bg-white/5 hover:text-accent-500 transition-all duration-300"
              >
                <span className="text-xl">👤</span>
                <span className="font-body font-medium">Login</span>
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="btn btn-primary w-full justify-center"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
