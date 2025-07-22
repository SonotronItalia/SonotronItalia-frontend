'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { ListOrdered, Hospital, BadgeCheck } from 'lucide-react';
import ScrollIndicator from './ScrollIndicator'; // Assicurati che il path sia corretto


const slides = [
  "/slide1.jpg",
  "/slide2.jpg",
  "/slide3.jpg",
];

export default function HeroSlideshow() {
  return (
    <div className="relative bg-cover bg-center w-full h-[100svh] overflow-hidden"
      style={{
      backgroundImage: "url('http://localhost:1337/uploads/background_home_34366fc92c.jpg')"
  }}
    >

      {/* Slideshow in background 
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        loop
        className="w-full h-full"
      >
        {slides.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>*/}

      {/* Overlay nero trasparente */}
      <div className="absolute inset-0 bg-white/10 z-10" />

      {/* Overlay 3 colonne linkate in basso */}
      <div className="absolute bottom-0 w-full z-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 text-center text-red-600 gap-6">

          <a
            href="http://www.sorazon.it/it/indicazioni"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-[#0099CC] no-underline flex flex-col items-center"
          >
            <ListOrdered size={40} className="mb-2" />
            <h3 className="text-xl font-bold mb-1">Indicazioni</h3>
            <p></p>
          </a>

          <a
            href="http://www.sorazon.it/it/contatti"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-[#0099CC] no-underline flex flex-col items-center"
          >
            <Hospital size={40} className="mb-2" />
            <h3 className="text-xl font-bold mb-1">Centri di riferimento</h3>
            <p></p>
          </a>

          <a
            href="http://www.sorazon.it/it/risultati"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-[#0099CC] no-underline flex flex-col items-center"
          >
            <BadgeCheck size={40} className="mb-2" />
            <h3 className="text-xl font-bold mb-1">Risultati</h3>
            <p></p>
          </a>

        </div>
      </div>
      <ScrollIndicator />

    </div>
  );
}
