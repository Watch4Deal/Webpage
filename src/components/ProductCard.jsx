import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ watch }) => {
  if (!watch) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={watch.images?.[0]?.url || 'placeholder-image-url.jpg'} alt={`${watch.brand} ${watch.model}`} className="product-image" />
      </div>
      <div className="product-info">
        <h2 className="product-name">{watch.brand} {watch.model}</h2>
        <div className="product-footer">
          <span className="product-price">
            {watch.cost 
              ? `₹${watch.cost.toLocaleString('en-IN')}`
              : 'Price not available'}
          </span>
          <Link to={`/watch/${watch.id}`} className="know-more-button">Know more</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;