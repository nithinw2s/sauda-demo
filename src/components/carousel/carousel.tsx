'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { carouselData } from '@/utils/carousel';

export default function CarouselComponent() {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      //  className="mySwiper h-75"
    >
      {carouselData.map((card, index) => (
        <SwiperSlide key={index} className='swipper-div'>
          <img
            src={card.image}
            alt={`Slide ${index + 1}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

