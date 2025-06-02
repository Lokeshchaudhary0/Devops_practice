import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { CartItem as CartItemType } from '../types';
import { products } from '../utils/data';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading cart data
    setLoading(true);
    
    setTimeout(() => {
      // For demo purposes, initialize with some sample items
      setCartItems([
        { product: products[0], quantity: 1 },
        { product: products[2], quantity: 2 },
      ]);
      setLoading(false);
    }, 500);
  }, []);
  
  const updateQuantity = (productId: string, newQuantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  const removeItem = (productId: string) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.product.id !== productId)
    );
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-medium mb-6">Shopping Cart</h1>
        <div className="animate-pulse space-y-4">
          <div className="h-24 bg-neutral-200 rounded"></div>
          <div className="h-24 bg-neutral-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (cartItems.length === 0) {
    return (
      <div className="bg-neutral-100 min-h-screen py-8">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-white rounded shadow p-8 max-w-md mx-auto">
            <div className="flex justify-center mb-4">
              <ShoppingCart size={64} className="text-neutral-300" />
            </div>
            <h2 className="text-2xl font-medium mb-2">Your Cart is Empty</h2>
            <p className="text-neutral-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link 
              to="/" 
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded font-medium inline-block transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-100 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-medium mb-6">Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded shadow p-4">
              {cartItems.map(item => (
                <CartItem 
                  key={item.product.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))}
              
              <div className="mt-4 flex justify-end">
                <Link 
                  to="/" 
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
          
          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary items={cartItems} />
            
            <div className="bg-white rounded shadow p-4 mt-4">
              <h3 className="font-medium mb-2">Payment Methods</h3>
              <div className="flex flex-wrap gap-2">
                <div className="border rounded px-3 py-2 text-sm">Credit Card</div>
                <div className="border rounded px-3 py-2 text-sm">Debit Card</div>
                <div className="border rounded px-3 py-2 text-sm">Net Banking</div>
                <div className="border rounded px-3 py-2 text-sm">UPI</div>
                <div className="border rounded px-3 py-2 text-sm">EMI</div>
                <div className="border rounded px-3 py-2 text-sm">Cash on Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;