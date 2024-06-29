import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue, push } from "firebase/database";
import { database } from '../firebase';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
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
    <div className='todov'>
      <header className="home-header">
        <Carousel showThumbs={false} autoPlay interval={4000} infiniteLoop>
          <div>
            <img src="https://www.10wallpaper.com/wallpaper/1366x768/1301/Omega-Fashion_watches_brand_advertising_Wallpaper_03_1366x768.jpg" height={730} width={'auto'} alt="Luxury Timepiece 1" />
            <p className="legend">Discover our exquisite collection of premium watches</p>
          </div>
          <div>
            <img src="https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg?cs=srgb&dl=pexels-pixabay-277319.jpg&fm=jpg" height={730} alt="Luxury Timepiece 2" />
            <p className="legend">Craftsmanship and elegance combined</p>
          </div>
          <div>
            <img src="https://wallpaperaccess.com/full/1332518.jpg" height={730} alt="Luxury Timepiece 3" />
            <p className="legend">Experience timeless luxury</p>
          </div>
        </Carousel>
      </header>
    <div className="home-container">
      
      
      <section className="brand-filter">
        <h2>FILTER BY BRAND</h2>
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
    </div>
  );
};

export default Home;
