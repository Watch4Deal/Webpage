import React from 'react';
import { Link } from 'react-router-dom';
import watches from '../data/watches.json'; 

const Home = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {watches.map((watch) => (
        <div key={watch.id} style={{ margin: 10, padding: 20, border: '1px solid #ccc', textAlign: 'center' }}>
          <img src={watch.images[0]} alt={watch.name} style={{ width: 100, height: 100 }} />
          <h2>{watch.brand} - {watch.model}</h2>
          <p>{watch.price}</p>
          <Link to={`/watch/${watch.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
