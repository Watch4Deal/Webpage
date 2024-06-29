import React, { useState } from 'react';
import './Footer.css';
import { push, ref } from 'firebase/database';
import { database } from '../firebase';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [testimonial, setTestimonial] = useState('');

  const handleTestimonialSubmit = (e) => {
    e.preventDefault();
    const newTestimonial = {
      name,
      email,
      text: testimonial,
    };
    push(ref(database, 'testimonials'), newTestimonial)
      .then(() => {
        alert('Thank you for your testimonial!');
        setName('');
        setEmail('');
        setTestimonial('');
      })
      .catch((error) => {
        console.error('Error submitting testimonial:', error);
      });
  };

  return (
    <footer className="footer-container">
      <div className="footer-section">
        <h3>Share Your Experience</h3>
        <form onSubmit={handleTestimonialSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Write your testimonial here..."
            value={testimonial}
            onChange={(e) => setTestimonial(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit Testimonial</button>
        </form>
      </div>
      <div className="footer-section">
        <h3>Contact</h3>
        <div className='para'>
        <p><FaEnvelope /> exclusive@gmail.com</p>
        <p><FaPhoneAlt /> +88015-88888-9999</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; Copyright 2024. All rights reserved</p>
      </div>
      <div className="social-icons">
        <i className="fab fa-facebook-f"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-linkedin-in"></i>
      </div>
    </footer>
  );
};

export default Footer;
