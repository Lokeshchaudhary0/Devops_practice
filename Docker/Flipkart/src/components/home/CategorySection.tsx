import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types';

interface CategorySectionProps {
  categories: Category[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  return (
    <section className="py-6 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-primary transition-all duration-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center text-sm font-medium text-neutral-800 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;