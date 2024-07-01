import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, onValue } from "firebase/database";
import { database } from '../firebase';
import './Item.css';

const Item = () => {
  const { id } = useParams();
  const [watch, setWatch] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [similarWatches, setSimilarWatches] = useState([]);

  useEffect(() => {
    const watchRef = ref(database, `watches/${id}`);
    onValue(watchRef, (snapshot) => {
      const data = snapshot.val();
      setWatch(data);
    });
  }, [id]);

  useEffect(() => {
    if (watch && watch.images && watch.images.length > 1) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % watch.images.length);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [watch]);

  useEffect(() => {
    const fetchSimilarWatches = async () => {
      // This is a placeholder. Implement your actual fetching logic here.
      // For example, you might want to fetch watches of the same brand or price range
      const similarWatchesRef = ref(database, 'watches');
      onValue(similarWatchesRef, (snapshot) => {
        const data = snapshot.val();
        const similarWatchesArray = Object.values(data)
          .filter(item => item.brand === watch.brand && item.id !== watch.id)
          .slice(0, 4); // Get up to 4 similar watches
        setSimilarWatches(similarWatchesArray);
      });
    };

    if (watch) {
      fetchSimilarWatches();
    }
  }, [watch]);

  if (!watch) {
    return <div className="loading">Loading exquisite timepiece details...</div>;
  }

  const message = watch.available
    ? `Hello, I'm interested in the ${watch.brand} ${watch.model} (Ref. ${watch.referenceNo}). Could you provide more details about its availability?`
    : `Hello, I'd like to be notified when the ${watch.brand} ${watch.model} (Ref. ${watch.referenceNo}) becomes available. Can you keep me updated?`;

  const whatsappURL = `https://api.whatsapp.com/send?phone=918075648949&text=${encodeURIComponent(message)}`;

  return (
    <div className="product-container">
      <div className="product-header">
        <h1 className="product-name">{watch.brand} {watch.model}</h1>
        <p className="product-reference">Ref. {watch.referenceNo}</p>
      </div>
      <div className="product-main">
        <div className="product-image">
          <div className="main-image-container">
            {watch.images && watch.images.length > 0 && (
              <img 
                src={watch.images[currentImageIndex].url || watch.images[currentImageIndex].preview} 
                alt={`${watch.brand} ${watch.model} - Main View`} 
                className="main-image"
              />
            )}
          </div>
          <div className="thumbnails">
            {watch.images && watch.images.map((image, index) => (
              <img 
                key={index} 
                src={image.preview || image.url} 
                alt={`${watch.brand} ${watch.model} - Preview ${index + 1}`} 
                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className="product-details">
          <div className="data-points">
            {[
              ['Size', watch.size],
              ['Movement', watch.movement],
              ['Condition', watch.condition],
              ['Color', watch.color],
              ['Scope', watch.scope],
              ['Origin', watch.origin],
              ['Water Resistance', watch.waterResistance],
              ['Warranty', `${watch.warranty} years`],
              ['Price', watch.cost]
            ].map(([label, value]) => (
              <div key={label} className="data-point">
                <span className="label">{label}:</span>
                <span className="value">{value}</span>
              </div>
            ))}
          </div>
          <div className="product-description">
            <div className="description-content">
              <div className="description-icon">
                <i className="fas fa-watch"></i>
              </div>
              <p className="description-text">{watch.description}</p>
            </div>
          </div>
          <div className="pricing-section">
            <p className={`availability ${watch.available ? 'in-stock' : 'out-of-stock'}`}>
              {watch.available ? "In Stock" : "Currently Unavailable"}
            </p>
            <button className="contact-btn" onClick={() => window.open(whatsappURL, '_blank')}>
              {watch.available ? "Inquire via WhatsApp" : "Register Interest"}
            </button>
          </div>
        </div>
      </div>
      <div className="similar-watches">
        <h2 className="similar-watches-title">Similar Watches</h2>
        <div className="similar-watches-grid">
          {similarWatches.map((similarWatch, index) => (
            <div key={index} className="similar-watch-item">
              <img src={similarWatch.images[0].url} alt={`${similarWatch.brand} ${similarWatch.model}`} className="similar-watch-image" />
              <div className="similar-watch-info">
                <h3 className="similar-watch-name">{similarWatch.brand} {similarWatch.model}</h3>
                <p className="similar-watch-price">{similarWatch.cost}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Item;