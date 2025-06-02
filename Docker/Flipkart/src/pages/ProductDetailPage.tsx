import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductDetail from '../components/products/ProductDetail';
import { products } from '../utils/data';
import { Product } from '../types';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    
    setTimeout(() => {
      const foundProduct = products.find(p => p.id === id) || null;
      setProduct(foundProduct);
      
      if (foundProduct) {
        // Find related products in the same category
        const related = products
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 5);
        setRelatedProducts(related);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);
  
  const addToCart = (productId: string, quantity: number) => {
    console.log('Adding to cart:', productId, quantity);
    // Implement cart functionality
    alert(`Added ${quantity} item(s) to cart!`);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-6 bg-neutral-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-200 rounded h-96"></div>
            <div>
              <div className="h-8 bg-neutral-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-neutral-200 rounded w-1/4 mb-6"></div>
              <div className="h-10 bg-neutral-200 rounded w-1/2 mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-neutral-200 rounded"></div>
                <div className="h-4 bg-neutral-200 rounded"></div>
                <div className="h-4 bg-neutral-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-medium mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-neutral-100 min-h-screen pb-8">
      <div className="container mx-auto px-4 py-4">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-4 text-neutral-600">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight size={14} className="mx-1" />
          <Link to={`/category/${product.category}`} className="hover:text-primary">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <ChevronRight size={14} className="mx-1" />
          <span className="text-neutral-800">{product.title}</span>
        </div>
        
        <ProductDetail 
          product={product}
          relatedProducts={relatedProducts}
          addToCart={addToCart}
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;