import React from 'react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="testimonial-card" style={cardStyle}>
      <p style={quoteStyle}>"{testimonial.text}"</p>
      <h4 style={nameStyle}>{testimonial.name}</h4>
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  margin: '10px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  maxWidth: '400px',
  textAlign: 'center',
};

const quoteStyle = {
  fontStyle: 'italic',
  color: '#555',
  marginBottom: '15px',
};

const nameStyle = {
  fontWeight: 'bold',
  color: '#333',
};

export default TestimonialCard;
