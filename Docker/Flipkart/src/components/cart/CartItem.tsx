import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  updateQuantity, 
  removeItem 
}) => {
  const { product, quantity } = item;
  const totalPrice = product.price * quantity;
  
  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeItem(product.id);
  };

  return (
    <div className="flex flex-col sm:flex-row py-4 border-b gap-4">
      {/* Product Image */}
      <div className="flex-shrink-0 sm:w-24 md:w-32 mx-auto sm:mx-0">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-auto object-contain"
          />
        </Link>
      </div>
      
      {/* Product Details */}
      <div className="flex-grow">
        <Link to={`/product/${product.id}`} className="hover:text-primary">
          <h3 className="font-medium text-neutral-800 mb-1">{product.title}</h3>
        </Link>
        
        <p className="text-neutral-500 text-sm mb-2">
          Seller: {product.brand}
          {product.freeDelivery && <span className="ml-2 text-success">Free Delivery</span>}
        </p>
        
        {/* Price */}
        <div className="flex items-center mb-3">
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
        
        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center border rounded">
            <button 
              onClick={handleDecrement}
              className="px-2 py-1 text-neutral-500 hover:text-primary disabled:opacity-50"
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="px-3 py-1 border-x">{quantity}</span>
            <button 
              onClick={handleIncrement}
              className="px-2 py-1 text-neutral-500 hover:text-primary"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button 
            onClick={handleRemove}
            className="text-neutral-500 hover:text-error transition-colors flex items-center text-sm"
          >
            <Trash2 size={16} className="mr-1" /> Remove
          </button>
        </div>
      </div>
      
      {/* Total Price - Only visible on larger screens */}
      <div className="hidden sm:block text-right whitespace-nowrap">
        <span className="font-semibold">₹{totalPrice.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default CartItem;