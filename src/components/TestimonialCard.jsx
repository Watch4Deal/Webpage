// In TestimonialCard.js
import React from 'react';
import './TestimonialCard.css';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="testimonial-card">
      <p className="testimonial-quote">"{testimonial.text}"</p>
      <h4 className="testimonial-name">{testimonial.name}</h4>
    </div>
  );
};

export default TestimonialCard;