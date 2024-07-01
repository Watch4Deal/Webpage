import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, get ,onValue, push} from "firebase/database";
import { database } from '../firebase';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.css';
import debounce from 'lodash.debounce';


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
            images: Object.values(watchesSnap.val()[key].images || {})  // Ensure images is always an array
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
  

  const handleSearchChange = debounce((event) => {
    setSearchQuery(event.target.value.toLowerCase());
  }, 300);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

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

  const filteredWatches = watches.filter(watch => {
    const priceCondition = filters.priceRange === '' || isPriceInRange(watch.cost, filters.priceRange);
    const brandCondition = filters.brand === '' || watch.brand === filters.brand;
    const availabilityCondition = filters.availability === '' || 
      (filters.availability === 'in-stock' && watch.available) ||
      (filters.availability === 'out-of-stock' && !watch.available);
    const movementCondition = filters.movement === '' || watch.movement === filters.movement;

    return watch.brand.toLowerCase().includes(searchQuery) && priceCondition && brandCondition && availabilityCondition && movementCondition;
  });

  return (
    <div className='todov'>
            
            <div className="header-image">
        <img src="/header.png" alt="Luxury Timepiece Header" />
        {/* <p className="header-legend">Discover our exquisite collection of premium watches</p> */}
      </div>
      <section className="search-filter">
        <input
          type="text"
          placeholder="Search by brand or model..."
          onChange={handleSearchChange}
          className="search-input"
        />
        <div className="filter-options">
          <select 
            name="brand" 
            onChange={handleFilterChange} 
            value={filters.brand}
            className="filter-select"
          >
            <option value="">All Brands</option>
            {watches.map(watch => (
              <option key={watch.brand} value={watch.brand}>{watch.brand}</option>
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
        </div>
      </section>
      <section className="watch-grid">
  {filteredWatches.length > 0 ? filteredWatches.map((watch) => (
    <Link key={watch.id} to={`/watch/${watch.id}`} className="watch-card">
      <div className="watch-image">
        <img src={watch.images[0]?.url} alt={`${watch.brand} ${watch.model}`} />
      </div>
      <div className="watch-info">
        <h3>{watch.brand}</h3>
        <h4>{watch.model}</h4>
        <p className="watch-price">{watch.cost}</p>
        <p className={`watch-availability ${watch.available ? 'in-stock' : 'out-of-stock'}`}>
          {watch.available ? "In Stock" : "Out of Stock"}
        </p>
      </div>
    </Link>
  )) : (
    <p>No watches matching the filters were found.</p>
  )}
</section>

<section className="about-our-collection">
  <h2>About Our Collection</h2>
  <div className="collection-content">
    <img src="/profile_about.png" alt="Elegant Watches" />
    <div className="collection-text">
      <p>We offer a curated selection of the world's finest timepieces, each chosen for its exceptional craftsmanship, design, and heritage. Our catalog features watches from renowned manufacturers known for their precision and attention to detail.</p>
      <p>Explore our range of luxury watches that embody sophistication and technological innovation. Whether you are a collector or seeking the perfect piece for special occasions, our selection promises to meet your highest expectations.</p>
      <p>Join us on a journey through time with pieces that tell a story of tradition, innovation, and the finest craftsmanship available in the world today.</p>
    </div>
  </div>
</section>

    
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-carousel">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <p>"{testimonial.text}"</p>
              <h4>{testimonial.name}</h4>
              
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
