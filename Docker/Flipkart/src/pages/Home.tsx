import React from 'react';
import HeroCarousel from '../components/home/HeroCarousel';
import CategorySection from '../components/home/CategorySection';
import ProductGrid from '../components/products/ProductGrid';
import { banners, categories, products } from '../utils/data';

const Home: React.FC = () => {
  // Filter products for different sections
  const featuredProducts = products.filter(product => product.badge === 'Bestseller' || product.badge === 'Top Rated');
  const newArrivals = products.filter(product => product.badge === 'New Launch');
  const discountedProducts = products.filter(product => product.discount && product.discount >= 15);

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Hero Carousel */}
      <HeroCarousel banners={banners} />
      
      {/* Categories */}
      <CategorySection categories={categories} />
      
      {/* Featured Products */}
      <ProductGrid 
        products={featuredProducts}
        title="Featured Products"
        viewAllLink="/featured"
      />
      
      {/* Middle Banner */}
      <div className="container mx-auto px-4 py-6">
        <div className="rounded overflow-hidden shadow-sm">
          <img 
            src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Special Offer" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
      
      {/* New Arrivals */}
      <ProductGrid 
        products={newArrivals.length ? newArrivals : products.slice(0, 5)}
        title="New Arrivals"
        viewAllLink="/new-arrivals"
      />
      
      {/* Deals of the Day */}
      <ProductGrid 
        products={discountedProducts.length ? discountedProducts : products.slice(0, 5)}
        title="Deals of the Day"
        viewAllLink="/deals"
      />
    </div>
  );
};

export default Home;