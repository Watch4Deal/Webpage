import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import watches from '../data/watches.json';
import './Item.css';

const Item = () => {
  const { id } = useParams();
  const watch = watches.find(w => w.id.toString() === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (watch) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % watch.images.length);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [watch?.images.length]);

  if (!watch) {
    return <div className="not-found">Watch not found</div>;
  }

  const message = watch.available? 
    `Hello, I am interested in the ${watch.brand} ${watch.model} (${watch.referenceNo}). Please let me know if it's available.` : 
    `Hello, I would like to be notified when the ${watch.brand} ${watch.model} (${watch.referenceNo}) becomes available.`;

  const whatsappURL = `https://api.whatsapp.com/send?phone=918075648949&text=${encodeURIComponent(message)}`;

  return (
    <div className="product-container">
      <div className="product-header">
        <h1 className="product-name">{watch.brand} {watch.model}</h1>
        <p className="product-reference">Ref. {watch.referenceNo}</p>
      </div>
      <div className="product-main">
        <div className="product-image">
          <img src={watch.images[currentImageIndex]} alt={`${watch.model} view`} className="main-image"/>
          <div className="thumbnails">
            {watch.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${watch.model} thumbnail`}
                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className="product-details">
          <div className="data-points">
            <div className="data-point">
              <span className="label">Size:</span>
              <span className="value">{watch.size}</span>
            </div>
            <div className="data-point">
              <span className="label">Movement:</span>
              <span className="value">{watch.movement}</span>
            </div>
            <div className="data-point">
              <span className="label">Condition:</span>
              <span className="value">{watch.conditionOfO}</span>
            </div>
            <div className="data-point">
              <span className="label">Color:</span>
              <span className="value">{watch.color}</span>
            </div>
            <div className="data-point">
              <span className="label">Scope:</span>
              <span className="value">{watch.scope}</span>
            </div>
            <div className="data-point">
              <span className="label">Origin:</span>
              <span className="value">{watch.origin}</span>
            </div>
            <div className="data-point">
              <span className="label">Water Resistance:</span>
              <span className="value">{watch.waterResistance}</span>
            </div>
            <div className="data-point">
              <span className="label">Warranty:</span>
              <span className="value">{watch.warranty} years</span>
            </div>
          </div>
          <div className="product-description">
        <h2>About the {watch.brand} {watch.model}</h2>
        <p>{watch.description}</p>
      </div>
          <div className="pricing-section">
            <p className="price">{watch.cost}</p>
            <p className="availability">{watch.available ? "In Stock" : "Out of Stock"}</p>
            <button className="contact-btn" onClick={() => window.open(whatsappURL, '_blank')}>
              {watch.available ? "Inquire on WhatsApp" : "Notify Me"}
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Item;