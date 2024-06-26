import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue, push } from "firebase/database";
import { database } from '../firebase';
import './Home.css';

const Home = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [watches, setWatches] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const brands = [...new Set(watches.map(watch => watch.brand))];

  useEffect(() => {
    const watchesRef = ref(database, 'watches');
    onValue(watchesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setWatches(Object.values(data));
      }
    }, (error) => {
      console.error("Error fetching watches data:", error);
    });

    const testimonialsRef = ref(database, 'testimonials');
    onValue(testimonialsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTestimonials(Object.values(data));
      }
    }, (error) => {
      console.error("Error fetching testimonials data:", error);
    });
  }, []);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const filteredWatches = selectedBrands.length > 0
    ? watches.filter(watch => selectedBrands.includes(watch.brand))
    : watches;

  const handleTestimonialSubmit = (e) => {
    e.preventDefault();
    const newTestimonial = {
      name,
      email,
      text: testimonial
    };
    push(ref(database, 'testimonials'), newTestimonial)
      .then(() => {
        alert('Thank you for your testimonial!');
        setName('');
        setEmail('');
        setTestimonial('');
      })
      .catch((error) => {
        console.error("Error submitting testimonial:", error);
      });
  };

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
          {filteredWatches.length > 0 ? (
            filteredWatches.map((watch) => (
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
            ))
          ) : (
            <p>No watches available</p>
          )}
        </div>
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
