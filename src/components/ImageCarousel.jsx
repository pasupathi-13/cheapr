import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ImageCarousel.css';

const ImageCarousel = ({ slides, autoPlayInterval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [slides.length, autoPlayInterval, isPaused]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      className="carousel-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="carousel-wrapper">
        {slides.map((slide, index) => (
          <div
            key={slide.id || index}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
            style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
          >
            <div className="carousel-image-wrapper">
              <img
                src={slide.image}
                alt={slide.title || slide.alt || 'Offer'}
                className="carousel-image"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div className="carousel-overlay">
                {slide.badge && <span className="carousel-badge">{slide.badge}</span>}
                <h2 className="carousel-title">{slide.title}</h2>
                <p className="carousel-subtitle">{slide.subtitle}</p>
                {slide.cta && (
                  <button 
                    className="carousel-cta" 
                    onClick={() => window.open(slide.ctaLink, '_blank')}
                  >
                    {slide.cta}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className="carousel-arrow carousel-arrow-left" onClick={goToPrev} aria-label="Previous slide">
        ❮
      </button>
      <button className="carousel-arrow carousel-arrow-right" onClick={goToNext} aria-label="Next slide">
        ❯
      </button>

      {/* Dot Indicators */}
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

ImageCarousel.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      image: PropTypes.string.isRequired,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      badge: PropTypes.string,
      cta: PropTypes.string,
      ctaLink: PropTypes.string,
      alt: PropTypes.string,
    })
  ).isRequired,
  autoPlayInterval: PropTypes.number,
};

export default ImageCarousel;