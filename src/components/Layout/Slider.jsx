import React from 'react';

import { useState, useEffect } from 'react';
import './Slider.css';

const slides = [
  {
    id: 1,
    title: 'Manage AI Models Efficiently',
    description: 'Organize and catalog your AI models with ease',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop',
  },
  {
    id: 2,
    title: 'Track Model Performance',
    description: 'Monitor and analyze your AI model inventory',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1200&h=600&fit=crop',
  },
  {
    id: 3,
    title: 'Collaborate with Teams',
    description: 'Share and discover AI models with your team',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop',
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="slider">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay">
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="slider-btn prev" onClick={prevSlide} aria-label="Previous slide">
        &#8249;
      </button>
      <button className="slider-btn next" onClick={nextSlide} aria-label="Next slide">
        &#8250;
      </button>
      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;




