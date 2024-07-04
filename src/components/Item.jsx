import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, onValue, query, limitToFirst } from "firebase/database";
import { database } from '../firebase';
import ProductCard from './ProductCard'; // Import the ProductCard component
import './Item.css';

const Item = () => {
  const { id } = useParams();
  const [watch, setWatch] = useState(null);
  const [similarWatches, setSimilarWatches] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Correctly added state for image index

  useEffect(() => {
    const watchRef = ref(database, `watches/${id}`);
    onValue(watchRef, (snapshot) => {
      const data = snapshot.val();
      setWatch(data);
      if (data && data.brand) {
        fetchSimilarWatches(data.brand); // Ensure brand is not undefined
      }
    });
  }, [id]); // Removed fetchSimilarWatches from dependency array

  useEffect(() => {
    if (watch && watch.brand) {
      fetchSimilarWatches(watch.brand);
    }
  }, [watch]); // Added this effect to correctly handle updates based on the watch brand

  const fetchSimilarWatches = (brand) => {
    const similarWatchesRef = query(ref(database, 'watches'), limitToFirst(3));
    onValue(similarWatchesRef, (snapshot) => {
      const watches = [];
      snapshot.forEach(childSnapshot => {
        if (childSnapshot.val().brand === brand && childSnapshot.key !== id) {
          watches.push({ id: childSnapshot.key, ...childSnapshot.val() });
        }
      });
      setSimilarWatches(watches);
    });
  };

  if (!watch) {
    return <div className="loading">Loading exquisite timepiece details...</div>;
  }

  const message = watch.available
    ? `Hello, I'm interested in the ${watch.brand} ${watch.model} (Ref. ${watch.referenceNo}). Could you provide more details about its availability?`
    : `Hello, I'd like to be notified when the ${watch.brand} ${watch.model} (Ref. ${watch.referenceNo}) becomes available. Can you keep me updated?`;

  const whatsappURL = `https://api.whatsapp.com/send?phone=918075648949&text=${encodeURIComponent(message)}`;

  return (
    <div className="product-container">
      <div className="product-main">
        <div className="product-image">
          <div className="main-image-container">
            {watch.images && watch.images.length > 0 && (
              <img src={watch.images[currentImageIndex].url || watch.images[currentImageIndex].preview} 
                alt={`${watch.brand} ${watch.model} - Main View`} className="main-image"
              />
            )}
            <div className="thumbnails">
              {watch.images && watch.images.map((image, index) => (
                <img key={index} src={image.preview || image.url}
                  alt={`${watch.brand} ${watch.model} - Preview ${index + 1}`}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="product-details">
          <h1 className="product-name">{watch.brand} {watch.model}</h1>
          <p className="product-subtitle">Pre-Owned • {watch.brand} {watch.model}</p>
          <ul className="product-specs">
            <li>Brand: {watch.brand}</li>
            <li>Model: {watch.model}</li>
            <li>Case: {watch.size}, {watch.material}</li>
            <li>Dial: {watch.color}</li>
            <li>Movement: {watch.movement}</li>
            <li>Bezel: {watch.bezel}</li>
            <li>Crystal: {watch.crystal}</li>
            <li>Water Resistance: {watch.waterResistance}</li>
            <li>Strap: {watch.strap}</li>
          </ul>
          <p className="availability">
            {watch.available ? "In Stock" : "This product is currently out of stock and unavailable."}
          </p>
          <button className="whatsapp-button" onClick={() => window.open(whatsappURL, '_blank')}>
            ORDER ON WHATSAPP
          </button>
          <div className="product-meta">
            <p>SKU: {watch.sku || 'N/A'}</p>
            <p>Category: {watch.category || "Men's Watches"}</p>
            <p>Tag: {watch.brand}</p>
          </div>
        </div>
      </div>
      <div className="similar-watches">
        <h2>Similar Watches</h2>
        {similarWatches.map(watch => (
          <ProductCard key={watch.id} watch={watch} />
        ))}
      </div>
    </div>
  );
};

export default Item;
