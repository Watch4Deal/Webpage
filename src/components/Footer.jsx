import React, { useState } from 'react';
import './Footer.css';
import { push, ref } from 'firebase/database';
import { database } from '../firebase';
import { FaEnvelope, FaPhoneAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

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

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    alert(`Subscribed with ${email}`);
    setEmail('');
  };

  return (
    <footer className="footer-container">
      <div className="testimonial-box">
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

      <div className="subscribe-section">
        <h3>Keep Up with Our Latest Products</h3>
        <p className="no-wrap">Subscribe to receive email updates on new arrivals.</p>
        <form className="subscribe-form" onSubmit={handleSubscribeSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      <div className="footer-section">
        <h3>Contact</h3>
        <div className='para'>
          <p>
            <a href="mailto:watch4deal24@gmail.com" className='contact-link'>
              <FaEnvelope /> watch4deal24@gmail.com
            </a>
          </p>
          <p>
            <a href="https://wa.me/+917510627261?text=Hello" target="_blank" rel="noopener noreferrer" className='contact-link'>
              <FaPhoneAlt /> +917510627261
            </a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; Copyright 2024. All rights reserved</p>
        <div className="social-icons">
          <a href="#" aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;