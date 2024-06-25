import React from 'react';
import { Link } from 'react-router-dom';
import watches from '../data/watches.json'; 
import './Home.css';

const Home = () => {
  return (
    <div className="container">
      {watches.map((watch) => (
        <Link to={`/watch/${watch.id}`} key={watch.id} className="watch-card-link">
          <div className="watch-card">
            <img src={watch.images[0]} alt={watch.name} />
            <h2>{watch.brand} - {watch.model}</h2>
            <p>{watch.cost}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
