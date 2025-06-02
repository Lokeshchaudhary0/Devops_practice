import React from 'react';
import { CartItem } from '../../types';

interface CartSummaryProps {
  items: CartItem[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ items }) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );
  
  const totalDiscount = items.reduce(
    (total, item) => {
      if (item.product.originalPrice) {
        return total + ((item.product.originalPrice - item.product.price) * item.quantity);
      }
      return total;
    }, 
    0
  );
  
  const deliveryCharges = totalPrice > 500 ? 0 : 40;
  
  const finalAmount = totalPrice + deliveryCharges;

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-medium text-neutral-800 text-lg pb-3 border-b">PRICE DETAILS</h2>
      <div className="space-y-3 pt-3">
        <div className="flex justify-between">
          <span className="text-neutral-700">Price ({totalItems} items)</span>
          <span>₹{totalPrice.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-neutral-700">Discount</span>
          <span className="text-success">- ₹{totalDiscount.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-neutral-700">Delivery Charges</span>
          {deliveryCharges === 0 ? (
            <span className="text-success">FREE</span>
          ) : (
            <span>₹{deliveryCharges}</span>
          )}
        </div>
        
        <div className="flex justify-between border-t border-dashed pt-3 font-medium">
          <span>Total Amount</span>
          <span>₹{finalAmount.toLocaleString()}</span>
        </div>
        
        {totalDiscount > 0 && (
          <div className="text-success text-sm pt-1">
            You will save ₹{totalDiscount.toLocaleString()} on this order
          </div>
        )}
      </div>
      
      <button className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded mt-4 font-medium">
        PLACE ORDER
      </button>
    </div>
  );
};

export default CartSummary;