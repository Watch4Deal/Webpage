import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import watches from '../data/watches.json';
import './Item.css';

const Item = () => {
  const { id } = useParams();
  const watch = watches.find(w => w.id.toString() === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % watch.images.length);
    }, 20000); 

    return () => clearInterval(intervalId); 
  }, [watch.images.length]);

  if (!watch) {
    return <div className="not-found">Watch not found</div>;
  }

  const whatsappMessage = `Hello, I am interested in the ${watch.brand} ${watch.model} (${watch.referenceNo}). Please let me know if it's available.`;
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappURL = `https://api.whatsapp.com/send?phone=918075648949&text=${encodedMessage}`;

  return (
    <div className="product-container">
      <div className="image-section">
        <img src={watch.images[currentImageIndex]} alt={`${watch.model} image ${currentImageIndex + 1}`} className="product-image"/>
        <div className="thumbnail-section">
          {watch.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${watch.model} thumbnail ${index + 1}`}
              className={`thumbnail-image ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
      <div className="details-section">
        <div className="about-product">
          <h1 className="product-title">{watch.brand} - {watch.model}</h1>
          <h2 className="product-price">{watch.cost}</h2>
          <div className="product-meta">
            <span>{watch.size}</span> | <span>{watch.movement}</span>
          </div>
          <p className="product-description">{watch.description}</p>
          <div className="product-details">
            <p><strong>Reference No:</strong> {watch.referenceNo}</p>
            <p><strong>Condition:</strong> {watch.conditionOfO}</p>
            <p><strong>Scope:</strong> {watch.scope}</p>
          </div>
          <div className="controls">
            <button className="whatsapp-button" onClick={() => window.open(whatsappURL, '_blank')}>
              Contact on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
