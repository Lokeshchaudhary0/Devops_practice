import React, { useState } from 'react';
import { Star, Truck, ShieldCheck, ArrowLeft, ArrowRight, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { Link } from 'react-router-dom';

interface ProductDetailProps {
  product: Product;
  relatedProducts?: Product[];
  addToCart: (productId: string, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  relatedProducts = [],
  addToCart
}) => {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const handlePrevImage = () => {
    setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };
  
  const handleNextImage = () => {
    setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };
  
  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  return (
    <div className="bg-white shadow-sm rounded p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="relative mb-4 h-64 sm:h-80 md:h-96 flex items-center justify-center bg-neutral-50 rounded overflow-hidden">
            {/* Main Image */}
            <img 
              src={product.images[activeImage]} 
              alt={product.title} 
              className="max-h-full max-w-full object-contain"
            />
            
            {/* Navigation Arrows */}
            <button 
              onClick={handlePrevImage}
              className="absolute left-2 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm z-10"
              aria-label="Previous image"
            >
              <ArrowLeft size={18} />
            </button>
            <button 
              onClick={handleNextImage}
              className="absolute right-2 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm z-10"
              aria-label="Next image"
            >
              <ArrowRight size={18} />
            </button>
            
            {/* Badge */}
            {product.badge && (
              <div className="absolute top-2 left-2 z-10 bg-primary text-white text-xs px-2 py-1 rounded">
                {product.badge}
              </div>
            )}
          </div>
          
          {/* Thumbnail Images */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`w-16 h-16 flex-shrink-0 border-2 rounded overflow-hidden ${
                  activeImage === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img 
                  src={image} 
                  alt={`${product.title} - view ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <button 
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary-dark text-white py-3 rounded font-medium flex items-center justify-center transition-colors"
            >
              <ShoppingCart size={18} className="mr-2" />
              ADD TO CART
            </button>
            <button className="bg-secondary hover:bg-secondary-dark text-neutral-900 py-3 rounded font-medium transition-colors">
              BUY NOW
            </button>
          </div>
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-xl md:text-2xl font-medium text-neutral-800 mb-2">
            {product.title}
          </h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center bg-success px-1.5 py-0.5 rounded text-white">
              <span>{product.rating}</span>
              <Star size={14} className="ml-0.5 fill-current" />
            </div>
            <span className="text-neutral-500 text-sm ml-2">{product.reviews.toLocaleString()} Ratings & Reviews</span>
          </div>
          
          {/* Price */}
          <div className="mb-4">
            <div className="flex items-center">
              <span className="text-2xl font-semibold text-neutral-900">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-neutral-500 text-base line-through ml-3">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-success text-base ml-2">
                    {product.discount}% off
                  </span>
                </>
              )}
            </div>
            {product.freeDelivery && (
              <p className="text-success text-sm mt-1">Free Delivery</p>
            )}
          </div>
          
          {/* Available Offers */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Available Offers</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-success font-medium mr-2">•</span>
                <span>Bank Offer: 10% off on XYZ Bank Credit Cards, up to ₹1500 on orders of ₹5000 and above</span>
              </li>
              <li className="flex items-start">
                <span className="text-success font-medium mr-2">•</span>
                <span>Special Price: Get extra 5% off (price inclusive of discount)</span>
              </li>
              <li className="flex items-start">
                <span className="text-success font-medium mr-2">•</span>
                <span>Partner Offer: Sign up for Flipkart Pay Later and get free Times Prime Benefits worth ₹10,000</span>
              </li>
            </ul>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-neutral-700 text-sm">{product.description}</p>
          </div>
          
          {/* Specifications */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Specifications</h3>
            <div className="border rounded divide-y">
              {product.specifications.map((spec, index) => (
                <div key={index} className="flex py-2 px-3 text-sm">
                  <div className="w-1/3 text-neutral-500">{spec.name}</div>
                  <div className="w-2/3 text-neutral-800">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Features */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Features</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-medium mb-2">Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center text-sm text-neutral-700">
                <Truck size={16} className="text-success mr-2" />
                <span>{product.freeDelivery ? 'Free Delivery' : 'Standard Delivery'}</span>
              </div>
              <div className="flex items-center text-sm text-neutral-700">
                <ShieldCheck size={16} className="text-success mr-2" />
                <span>10 Days Replacement</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-8 pt-6 border-t">
          <h2 className="text-lg font-medium mb-4">Similar Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {relatedProducts.slice(0, 5).map((relProduct) => (
              <div key={relProduct.id} className="bg-white border rounded p-2 hover:shadow-md transition-shadow">
                <Link to={`/product/${relProduct.id}`} className="block">
                  <div className="h-32 flex items-center justify-center mb-2">
                    <img 
                      src={relProduct.image} 
                      alt={relProduct.title} 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-neutral-800 line-clamp-2 mb-1">
                    {relProduct.title}
                  </h3>
                  <p className="text-sm font-semibold">₹{relProduct.price.toLocaleString()}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;