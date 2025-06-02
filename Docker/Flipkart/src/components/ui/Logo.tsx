import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <ShoppingCart size={24} className="text-white mr-2" />
      <div>
        <h1 className="text-white text-xl font-bold italic tracking-tighter">Flipkart</h1>
        <div className="flex items-center text-xs">
          <span className="text-secondary italic font-medium">Explore</span>
          <span className="text-secondary-light italic ml-1 font-medium">Plus</span>
          <span className="text-yellow-300 ml-1">+</span>
        </div>
      </div>
    </div>
  );
};

export default Logo;