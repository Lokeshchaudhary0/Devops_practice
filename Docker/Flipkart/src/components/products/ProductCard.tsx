import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded shadow-sm hover:shadow-md transition-shadow group relative">
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-2 left-2 z-10 bg-primary text-white text-xs px-2 py-1 rounded">
          {product.badge}
        </div>
      )}
      
      {/* Wishlist Button */}
      <button 
        className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Add to wishlist"
      >
        <Heart size={18} className="text-neutral-500 hover:text-error" />
      </button>
      
      {/* Product Link */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="h-48 p-4 flex items-center justify-center overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-4 border-t">
          <h3 className="font-medium text-neutral-800 line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center bg-success px-1.5 py-0.5 rounded text-white text-xs">
              <span>{product.rating}</span>
              <Star size={12} className="ml-0.5 fill-current" />
            </div>
            <span className="text-neutral-500 text-xs ml-2">({product.reviews})</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center">
            <span className="font-semibold text-neutral-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span className="text-neutral-500 text-sm line-through ml-2">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="text-success text-sm ml-2">
                  {product.discount}% off
                </span>
              </>
            )}
          </div>
          
          {/* Free Delivery */}
          {product.freeDelivery && (
            <p className="text-neutral-600 text-xs mt-1">Free Delivery</p>
          )}
        </div>
      </Link>
      
      {/* Quick Add to Cart Button - Mobile & Hover */}
      <div className="p-3 border-t md:absolute md:bottom-0 md:left-0 md:right-0 md:opacity-0 md:group-hover:opacity-100 md:transform md:translate-y-full md:group-hover:translate-y-0 transition-all duration-300 bg-white">
        <button className="w-full bg-primary hover:bg-primary-dark text-white text-sm py-2 px-4 rounded flex items-center justify-center">
          <ShoppingCart size={16} className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;