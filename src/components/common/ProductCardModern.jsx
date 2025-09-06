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
    <Link to={`/products/${product.id}`} className="block">
      <div 
        className="product-card group h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          {/* Product Image */}
          <img
            src={product.image || '/api/placeholder/400/300'}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 image-placeholder">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"></div>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Price badge */}
          <div className="absolute top-4 right-4 badge badge-primary font-bold shadow-lg">
            ${product.price}
          </div>

          {/* Category badge */}
          {product.category && (
            <div className="absolute top-4 left-4 badge badge-secondary backdrop-blur-sm">
              {product.category}
            </div>
          )}

          {/* Quick Actions */}
          <div className={`absolute bottom-4 left-4 right-4 flex items-center justify-center space-x-3 transition-all duration-500 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button
              onClick={handleAddToCart}
              className="btn btn-primary flex-1 py-2 text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h12"/>
              </svg>
              Add to Cart
            </button>
            <button className="btn btn-secondary w-10 h-10 p-0 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Stock status */}
          {product.inStock === false && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="bg-error text-white px-4 py-2 rounded-xl font-medium">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Product name */}
          <h3 className="font-display font-bold text-xl text-white group-hover:text-accent-500 transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>
          
          {/* Description */}
          <p className="text-neutral-400 text-sm line-clamp-2 group-hover:text-neutral-300 transition-colors duration-300">
            {product.description}
          </p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-accent-500'
                        : 'text-neutral-600'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-neutral-400">
                ({product.rating?.toFixed(1)})
              </span>
            </div>
          )}

          {/* Price and stock */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-display font-bold text-gradient">
                ${product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-neutral-500 line-through text-sm">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            
            {/* Stock indicator */}
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${
                product.inStock !== false ? 'bg-success' : 'bg-error'
              }`}></div>
              <span className="text-xs text-neutral-400 font-medium">
                {product.inStock !== false ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>

        {/* Modern corner accents */}
        <div className="absolute top-3 left-3 w-3 h-3 border-l-2 border-t-2 border-accent-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute top-3 right-3 w-3 h-3 border-r-2 border-t-2 border-accent-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute bottom-3 left-3 w-3 h-3 border-l-2 border-b-2 border-accent-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute bottom-3 right-3 w-3 h-3 border-r-2 border-b-2 border-accent-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      </div>
    </Link>
  );
};

export default ProductCard;
