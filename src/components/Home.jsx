import React, { useState, useEffect, useReducer } from 'react';
import { ref, get } from "firebase/database";
import { database } from '../firebase';
import './Home.css';
import debounce from 'lodash.debounce';
import ProductCard from './ProductCard';
import TestimonialCard from './TestimonialCard';
import AboutSection from './AboutSection';

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, [action.name]: action.value };
    default:
      return state;
  }
};

const Home = () => {
  const [watches, setWatches] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, dispatch] = useReducer(filterReducer, {
    brand: '',
    priceRange: '',
    availability: '',
    movement: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false); // Added state to toggle filter visibility
  const watchesPerPage = 8;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const testimonialsToShow = isMobile ? 1 : 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials]);
  useEffect(() => {
    const fetchData = async () => {
      const watchesRef = ref(database, 'watches');
      const testimonialsRef = ref(database, 'testimonials');

      const watchesSnap = await get(watchesRef);
      const testimonialsSnap = await get(testimonialsRef);

      if (watchesSnap.exists()) {
        setWatches(Object.values(watchesSnap.val()));
      }
      if (testimonialsSnap.exists()) {
        setTestimonials(Object.values(testimonialsSnap.val()));
      }
    };

    fetchData();
  }, []);

  

  const handleSearchChange = debounce((event) => {
    setSearchQuery(event.target.value.toLowerCase());
  }, 300);

  const handleFilterChange = (event) => {
    dispatch({
      type: 'SET_FILTER',
      name: event.target.name,
      value: event.target.value
    });
    setCurrentPage(1);
  };

  const currentWatches = watches.filter(watch => {
    return watch.brand.toLowerCase().includes(searchQuery) &&
      (filters.brand === '' || watch.brand === filters.brand) &&
      (filters.availability === '' || 
        (filters.availability === 'in-stock' && watch.available) ||
        (filters.availability === 'out-of-stock' && !watch.available)) &&
      (filters.movement === '' || watch.movement === filters.movement);
  });

  const totalPages = Math.ceil(currentWatches.length / watchesPerPage);
  const indexOfFirstWatch = currentPage * watchesPerPage - watchesPerPage;
  const currentWatchesDisplayed = currentWatches.slice(indexOfFirstWatch, indexOfFirstWatch + watchesPerPage);

  const currentTestimonialsDisplayed = isMobile
  ? [testimonials[testimonialIndex]]
  : testimonials.slice(testimonialIndex, testimonialIndex + testimonialsToShow);
  return (
    <div className='home'>
      <div className="header-image">
        <img src="/header.png" alt="Luxury Timepiece Header" />
      </div>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by brand or model..."
          onChange={handleSearchChange}
          className="search-input"
        />
        <button 
          onClick={() => setShowFilters(!showFilters)} 
          className="filter-toggle"
        >
          Filters
        </button>
        {showFilters && (
          <div className="filter-options">
            <select
              name="brand"
              onChange={handleFilterChange}
              value={filters.brand}
              className="filter-select"
            >
              <option value="">All Brands</option>
              {Array.from(new Set(watches.map(watch => watch.brand))).map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            <select
              name="priceRange"
              onChange={handleFilterChange}
              value={filters.priceRange}
              className="filter-select"
            >
              <option value="">All Prices</option>
              <option value="under100000">Under ₹1,00,000</option>
              <option value="100000to500000">₹1,00,000 - ₹5,00,000</option>
              <option value="over500000">Over ₹5,00,000</option>
            </select>
            <select
              name="availability"
              onChange={handleFilterChange}
              value={filters.availability}
              className="filter-select"
            >
              <option value="">All Availability</option>
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
            <select
              name="movement"
              onChange={handleFilterChange}
              value={filters.movement}
              className="filter-select"
            >
              <option value="">All Movements</option>
              {Array.from(new Set(watches.map(watch => watch.movement))).map(movement => (
                <option key={movement} value={movement}>{movement}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      <section className="watch-grid">
        {currentWatchesDisplayed.length > 0 ? currentWatchesDisplayed.map((watch) => (
          <ProductCard key={watch.id} watch={watch} />
        )) : (
          <p>No watches matching the filters were found.</p>
        )}
      </section>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`page-button ${index + 1 === currentPage ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <AboutSection />
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          {currentTestimonialsDisplayed.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
