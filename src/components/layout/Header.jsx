import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../hooks/useAuth';

// Clean, modern, responsive header
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Products', href: '/products', icon: '🎨' },
    { name: 'About', href: '/about', icon: '📖' },
    { name: 'Contact', href: '/contact', icon: '📞' },
  ];

  const cartCount = (cartItems || []).reduce((sum, it) => sum + (it.quantity || 0), 0);

  return (
    <header
      className={
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ' +
        (isScrolled
          ? 'bg-black/90 backdrop-blur-lg border-b border-orange-500/20 shadow-lg'
          : 'bg-black/50 backdrop-blur-sm')
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                D
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                DriftoZ
              </span>
              <span className="text-xs text-gray-400 font-medium">3D Craft Studio</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {nav.map((item) => {
              const active = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={
                    'relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ' +
                    (active
                      ? 'text-orange-400 bg-orange-500/10'
                      : 'text-gray-300 hover:text-orange-400 hover:bg-orange-500/5')
                  }
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-sm">{item.icon}</span>
                    <span>{item.name}</span>
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <button
              aria-label="Search"
              className="hidden md:flex w-10 h-10 rounded-lg bg-gray-800/50 text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 transition-colors duration-300 items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link
              to="/cart"
              aria-label="Cart"
              className="relative w-10 h-10 rounded-lg bg-gray-800/50 text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 transition-colors duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0H17M17 18a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            <div className="hidden md:flex items-center space-x-2">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-3 py-2 text-gray-300 hover:text-orange-400 font-medium transition-colors duration-300"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-gray-200 font-medium rounded-lg transition-all duration-300"
                  >
                    Logout
                  </button>
                  <div className="ml-1 w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center font-bold">
                    {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-3 py-2 text-gray-300 hover:text-orange-400 font-medium transition-colors duration-300">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="md:hidden w-10 h-10 rounded-lg bg-gray-800/50 text-gray-400 hover:text-orange-400 transition-colors duration-300 flex items-center justify-center"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-lg rounded-2xl mt-4 border border-gray-800">
              {nav.map((item) => {
                const active = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={
                      'flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ' +
                      (active ? 'text-orange-400 bg-orange-500/10' : 'text-gray-300 hover:text-orange-400 hover:bg-orange-500/5')
                    }
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              <div className="pt-4 space-y-3 border-t border-gray-800">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full px-4 py-3 text-center text-gray-300 hover:text-orange-400 font-medium transition-colors duration-300"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { logout(); setIsMenuOpen(false); }}
                      className="block w-full px-4 py-3 bg-gray-800/60 hover:bg-gray-700 text-gray-200 font-medium rounded-xl transition-all duration-300 text-center"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full px-4 py-3 text-center text-gray-300 hover:text-orange-400 font-medium transition-colors duration-300"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all duration-300 text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;