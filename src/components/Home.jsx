import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import watches from '../data/watches.json';
import './Home.css';

const Home = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [email, setEmail] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const brands = [...new Set(watches.map(watch => watch.brand))];

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const filteredWatches = selectedBrands.length > 0
    ? watches.filter(watch => selectedBrands.includes(watch.brand))
    : watches;

  const handleWaitingList = (e) => {
    e.preventDefault();
    // Here you would typically implement the logic to add the user to the waiting list
    alert(`You've been added to the waiting list with email: ${email}`);
    setEmail('');
  };

  const handleTestimonialSubmit = (e) => {
    e.preventDefault();
    // Here you would typically implement the logic to submit the testimonial
    alert('Thank you for your testimonial!');
    setTestimonial('');
  };

  // Sample testimonials
  const testimonials = [
    { id: 1, name: "John Doe", text: "The quality of these watches is unparalleled. I'm extremely satisfied with my purchase!" },
    { id: 2, name: "Jane Smith", text: "The customer service is top-notch. They helped me find the perfect timepiece for my collection." },
    { id: 3, name: "Alex Johnson", text: "I've been collecting watches for years, and this store has some of the most exquisite pieces I've ever seen." },
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Luxury Timepieces</h1>
        <p>Discover our exquisite collection of premium watches</p>
      </header>
      
      <section className="brand-filter">
        <h2>Filter by Brand</h2>
        <div className="brand-buttons">
          {brands.map(brand => (
            <button 
              key={brand} 
              className={`brand-button ${selectedBrands.includes(brand) ? 'active' : ''}`}
              onClick={() => toggleBrand(brand)}
            >
              {brand}
            </button>
          ))}
        </div>
      </section>

      <section className="featured-watches">
        <h2>Featured Watches</h2>
        <div className="watch-grid">
          {filteredWatches.map((watch) => (
            <div key={watch.id} className="watch-card-wrapper">
              <Link to={`/watch/${watch.id}`} className="watch-card-link">
                <div className="watch-card">
                  <div className="watch-image">
                    <img src={watch.images[0]} alt={`${watch.brand} ${watch.model}`} />
                  </div>
                  <div className="watch-info">
                    <h3>{watch.brand}</h3>
                    <h4>{watch.model}</h4>
                    <p className="watch-price">{watch.cost}</p>
                    <p className={`watch-availability ${watch.available ? 'in-stock' : 'out-of-stock'}`}>
                      {watch.available ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
      
      <section className="waiting-list">
        <h2>Join Our Waiting List</h2>
        <p>Be the first to know when new watches become available!</p>
        <form onSubmit={handleWaitingList}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <button type="submit">Join Waiting List</button>
        </form>
      </section>

      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-list">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <p>"{testimonial.text}"</p>
              <h4>- {testimonial.name}</h4>
            </div>
          ))}
        </div>
        <div className="add-testimonial">
          <h3>Share Your Experience</h3>
          <form onSubmit={handleTestimonialSubmit}>
            <textarea 
              placeholder="Write your testimonial here..." 
              value={testimonial} 
              onChange={(e) => setTestimonial(e.target.value)}
              required
            ></textarea>
            <button type="submit">Submit Testimonial</button>
          </form>
        </div>
      </section>

      <section className="watch-data">
        <h2>Our Collection at a Glance</h2>
        <div className="data-cards">
          <div className="data-card">
            <h3>{watches.length}</h3>
            <p>Unique Models</p>
          </div>
          <div className="data-card">
            <h3>{brands.length}</h3>
            <p>Luxury Brands</p>
          </div>
          <div className="data-card">
            <h3>{watches.filter(w => w.available).length}</h3>
            <p>In Stock</p>
          </div>
        </div>
      </section>

      <section className="about-us">
        <h2>About Our Collection</h2>
        <p>We offer a curated selection of the world's finest timepieces. Each watch in our collection is chosen for its exceptional craftsmanship, design, and heritage.</p>
      </section>
    </div>
  );
};

export default Home;