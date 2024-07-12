import React from 'react';
import './TestimonialCard.css';

// Utility function to generate star icons
const renderStars = (rate) => {
  let stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rate) {
      stars.push(<span key={i} className="star">&#9733;</span>); // Filled star
    } else {
      stars.push(<span key={i} className="star">&#9734;</span>); // Empty star
    }
  }
  return stars;
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="testimonial-card">
      <p className="testimonial-quote">"{testimonial.text}"</p>
      <h4 className="testimonial-name">{testimonial.name}</h4>
      <div className="testimonial-rating">
        {renderStars(testimonial.rate)}
      </div>
    </div>
  );
};

export default TestimonialCard;
