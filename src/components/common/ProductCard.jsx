import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart && onAddToCart(product);
  };

  return (
    <Link to={`/products/${product.id}`}>
      <div 
        className="card-drift p-0 h-full overflow-hidden group transform transition-all duration-300 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
          {/* Product Image */}
          <img
            src={product.image || '/api/placeholder/300/300'}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 shimmer">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"></div>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Price badge */}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-gradient-to-r from-drift-yellow to-drift-gold text-drift-black px-2 sm:px-3 py-1 rounded-full font-bold text-sm sm:text-lg shadow-glow">
            ${product.price}
          </div>

          {/* Category badge */}
          {product.category && (
            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-black/70 text-drift-yellow px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm">
              {product.category}
            </div>
          )}

          {/* Quick actions - shown on hover */}
          <div className={`absolute bottom-4 left-4 right-4 transform transition-all duration-500 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}>
            <div className="flex space-x-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-drift text-sm py-2 px-4 font-semibold transform hover:scale-105 transition-all duration-300"
              >
                🛒 Add to Cart
              </button>
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-drift-yellow hover:text-drift-black transition-all duration-300">
                ❤️
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Product name */}
          <h3 className="text-lg sm:text-xl font-racing font-bold text-white mb-2 group-hover:text-drift-yellow transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>
          
          {/* Description */}
          <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 group-hover:text-gray-100 transition-colors duration-300">
            {product.description}
          </p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-drift-yellow'
                        : 'text-gray-600'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-xs sm:text-sm text-gray-400">
                ({product.rating?.toFixed(1)})
              </span>
            </div>
          )}

          {/* Bottom section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg sm:text-2xl font-racing font-bold text-gradient">
                ${product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-gray-500 line-through text-xs sm:text-sm">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            
            {/* Stock indicator */}
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${
                product.inStock !== false ? 'bg-green-400' : 'bg-red-400'
              }`}></div>
              <span className="text-xs text-gray-400">
                {product.inStock !== false ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>

        {/* Animated border */}
        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-drift-yellow transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
        
        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-drift-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-drift-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-drift-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-drift-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </Link>
  );
};

export default ProductCard;