import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../types';

interface ProductGridProps {
  products: Product[];
  title?: string;
  viewAllLink?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  title, 
  viewAllLink 
}) => {
  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-neutral-800">{title}</h2>
            {viewAllLink && (
              <a 
                href={viewAllLink} 
                className="text-primary hover:underline text-sm font-medium"
              >
                View All
              </a>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;