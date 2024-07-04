import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'; 

const ProductCard = ({ watch }) => {
  return (
    <div className="product-card">
      <div className="image-container-card">
        <img src={watch.images[0]?.url} alt={`${watch.brand} ${watch.model}`} className="product-image" />
      </div>
      <div className="product-description">
      <h2 className="product-name-card">{watch.brand} {watch.model}</h2>
        <p>{watch.description}</p>
      </div>
      <div className="product-footer">
        <span className="price-card">{watch.cost} INR</span>
        <Link to={`/watch/${watch.id}`} className="know-more-button">Know More</Link>
      </div>
    </div>
  );
};

export default ProductCard;
