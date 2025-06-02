import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Banner } from '../../types';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface HeroCarouselProps {
  banners: Banner[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ banners }) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative overflow-hidden group">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        onInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="w-full h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link to={banner.link}>
              <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full">
                <img 
                  src={banner.image} 
                  alt={banner.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent flex flex-col justify-end p-6">
                  <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-lg">
                    {banner.title}
                  </h2>
                  <p className="text-white text-sm md:text-base mt-2 max-w-md drop-shadow-lg">
                    Exclusive deals you don't want to miss!
                  </p>
                  <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded mt-4 w-max text-sm md:text-base transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Navigation Arrows */}
      <div 
        ref={prevRef}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
      >
        <ChevronLeft size={24} className="text-neutral-800" />
      </div>
      <div 
        ref={nextRef}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
      >
        <ChevronRight size={24} className="text-neutral-800" />
      </div>
    </div>
  );
};

export default HeroCarousel;