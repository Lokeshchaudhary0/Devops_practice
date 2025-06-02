import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown } from 'lucide-react';
import Logo from '../ui/Logo';
import { categories } from '../../utils/data';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-primary shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="w-[400px] py-2 px-4 pr-10 rounded-sm text-sm focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-500"
              >
                <Search size={18} />
              </button>
            </form>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/account" className="flex items-center text-white hover:text-secondary-light">
              <User size={20} className="mr-2" />
              <span className="font-medium">Account</span>
            </Link>
            <Link to="/wishlist" className="flex items-center text-white hover:text-secondary-light">
              <Heart size={20} className="mr-2" />
              <span className="font-medium">Wishlist</span>
            </Link>
            <Link to="/cart" className="flex items-center text-white hover:text-secondary-light">
              <ShoppingCart size={20} className="mr-2" />
              <span className="font-medium">Cart</span>
            </Link>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between">
          <button onClick={toggleMenu} className="text-white p-1">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>
          <div className="flex items-center space-x-3">
            <Link to="/wishlist" className="text-white">
              <Heart size={20} />
            </Link>
            <Link to="/cart" className="text-white">
              <ShoppingCart size={20} />
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 w-full animate-slide-down shadow-lg">
            <div className="p-4">
              <form onSubmit={handleSearch} className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  className="w-full py-2 px-4 pr-10 border border-neutral-300 rounded-sm text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-500"
                >
                  <Search size={18} />
                </button>
              </form>
              <Link 
                to="/account" 
                className="flex items-center py-3 border-b border-neutral-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} className="mr-3 text-primary" />
                <span>Login / Sign Up</span>
              </Link>
              <div className="py-2">
                <h3 className="font-medium py-2">Shop by Category</h3>
                {categories.map((category) => (
                  <Link 
                    key={category.id} 
                    to={`/category/${category.id}`}
                    className="block py-2 px-2 text-neutral-700 hover:bg-neutral-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Categories Navigation - Desktop */}
      <nav className="bg-white border-b border-neutral-200 hidden md:block">
        <div className="container mx-auto">
          <ul className="flex justify-between items-center px-4">
            {categories.map((category) => (
              <li 
                key={category.id}
                className="relative group"
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Link 
                  to={`/category/${category.id}`}
                  className="flex items-center py-2 px-3 text-sm font-medium text-neutral-800 hover:text-primary"
                >
                  {category.name}
                  {category.subcategories && <ChevronDown size={16} className="ml-1" />}
                </Link>
                
                {/* Mega Menu */}
                {category.subcategories && activeCategory === category.id && (
                  <div className="absolute top-full left-0 bg-white shadow-lg w-56 animate-fade-in z-10">
                    <div className="py-2">
                      {category.subcategories.map((subcategory) => (
                        <Link 
                          key={subcategory.id}
                          to={`/category/${category.id}/${subcategory.id}`}
                          className="block py-2 px-4 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-primary"
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;