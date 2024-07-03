import React, { useState, useEffect } from 'react';
import { ref, get } from "firebase/database";
import { database } from '../firebase';
import './Home.css';
import debounce from 'lodash.debounce';
import ProductCard from './ProductCard';
import TestimonialCard from './TestimonialCard';
import AboutSection from './AboutSection';

const Home = () => {
  const [watches, setWatches] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    brand: '',
    priceRange: '',
    availability: '',
    movement: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const watchesPerPage = window.innerWidth < 768 ? 4 : 8;
  const testimoniesPerPage = window.innerWidth < 768 ? 1 : 3;

  const isPriceInRange = (price, range) => {
    const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
    switch (range) {
      case 'under100000':
        return numericPrice < 100000;
      case '100000to500000':
        return numericPrice >= 100000 && numericPrice <= 500000;
      case 'over500000':
        return numericPrice > 500000;
      default:
        return true;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const watchesRef = ref(database, 'watches');
        const testimonialsRef = ref(database, 'testimonials');

        const watchesSnap = await get(watchesRef);
        const testimonialsSnap = await get(testimonialsRef);

        let watchesArray = [];
        let testimonialsArray = [];

        if (watchesSnap.exists()) {
          watchesArray = Object.keys(watchesSnap.val()).map(key => ({
            id: key,
            ...watchesSnap.val()[key],
            images: Object.values(watchesSnap.val()[key].images || {})
          }));
        }

        if (testimonialsSnap.exists()) {
          testimonialsArray = Object.values(testimonialsSnap.val());
        }

        setWatches(watchesArray);
        setTestimonials(testimonialsArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prevIndex) => (prevIndex + testimoniesPerPage) % testimonials.length);
    }, 5000); // Change testimonials every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials, testimoniesPerPage]);

  const handleSearchChange = debounce((event) => {
    setSearchQuery(event.target.value.toLowerCase());
  }, 300);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const filteredWatches = watches.filter(watch => {
    const searchCondition = watch.brand.toLowerCase().includes(searchQuery);
    const priceCondition = filters.priceRange === '' || isPriceInRange(watch.cost, filters.priceRange);
    const brandCondition = filters.brand === '' || watch.brand === filters.brand;
    const availabilityCondition = filters.availability === '' || 
      (filters.availability === 'in-stock' && watch.available) ||
      (filters.availability === 'out-of-stock' && !watch.available);
    const movementCondition = filters.movement === '' || watch.movement === filters.movement;

    return searchCondition && priceCondition && brandCondition && availabilityCondition && movementCondition;
  });

  const indexOfLastWatch = currentPage * watchesPerPage;
  const indexOfFirstWatch = indexOfLastWatch - watchesPerPage;
  const currentWatches = filteredWatches.slice(indexOfFirstWatch, indexOfLastWatch);

  const totalPages = Math.ceil(filteredWatches.length / watchesPerPage);

  const uniqueBrands = Array.from(new Set(watches.map(watch => watch.brand)));

  const currentTestimonials = testimonials.slice(testimonialIndex, testimonialIndex + testimoniesPerPage);

  return (
    <div className='home'>
      <div className="header-image">
        <img src="/header.png" alt="Luxury Timepiece Header" />
      </div>

      <section className="search-filter">
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
              {uniqueBrands.map(brand => (
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
      </section>

      <section className="watch-grid">
        {currentWatches.length > 0 ? currentWatches.map((watch) => (
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
          {currentTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
