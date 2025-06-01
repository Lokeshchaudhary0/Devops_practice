import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem as CartItemType } from '@/constants/MockData';

interface CartContextType {
  items: CartItemType[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  deleteFromCart: (productId: string) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate totals whenever the cart changes
    let itemCount = 0;
    let price = 0;
    
    items.forEach(item => {
      itemCount += item.quantity;
      price += item.price * item.quantity;
    });
    
    setTotalItems(itemCount);
    setTotalPrice(price);
  }, [items]);

  const addToCart = (product: Product) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Increment quantity of existing item
        return currentItems.map(item => 
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...currentItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === productId);
      
      if (existingItem && existingItem.quantity === 1) {
        // Remove item if quantity would become 0
        return currentItems.filter(item => item.id !== productId);
      } else if (existingItem) {
        // Decrement quantity
        return currentItems.map(item => 
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      
      return currentItems;
    });
  };

  const deleteFromCart = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemQuantity = (productId: string) => {
    const item = items.find(item => item.id === productId);
    return item?.quantity || 0;
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      deleteFromCart,
      clearCart,
      getItemQuantity,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}