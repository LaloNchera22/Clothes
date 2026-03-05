"use client";

import { useState, useEffect } from "react";

const images = [
  "/Gemini_Generated_Image_lbbn0tlbbn0tlbbn.png",
  "/Gemini_Generated_Image_isfjitisfjitisfj.png",
  "/Gemini_Generated_Image_8ytcdw8ytcdw8ytc.png",
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Carousel image"
        className="relative z-10 w-full h-full max-h-full object-contain grayscale contrast-[1.2] transition-transform duration-700 hover:scale-105"
        src={images[currentIndex]}
      />
      <span className="absolute top-0 left-0 text-[10px] font-mono text-stone-400 tracking-widest z-20 bg-white px-2 py-1 brutalist-border-light">OBJ.001</span>
      <span className="absolute bottom-0 right-0 text-[10px] font-mono text-stone-400 tracking-widest z-20 bg-white px-2 py-1 brutalist-border-light">ED. / 2024</span>

      {/* Navigation Arrows */}
      <button
        onClick={prevImage}
        className="absolute left-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white text-stone-800 p-2 rounded-full"
        aria-label="Previous image"
      >
        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white text-stone-800 p-2 rounded-full"
        aria-label="Next image"
      >
        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
      </button>
    </div>
  );
}
