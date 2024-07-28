import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue, query, limitToFirst } from "firebase/database";
import { database } from "../firebase";
import ProductCard from "./ProductCard";
import "./Item.css";

const Item = () => {
  const { id } = useParams();
  const [watch, setWatch] = useState(null);
  const [similarWatches, setSimilarWatches] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchSimilarWatches = useCallback(
    (brand) => {
      const similarWatchesRef = query(
        ref(database, "watches"),
        limitToFirst(3)
      );
      onValue(similarWatchesRef, (snapshot) => {
        const watches = [];
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().brand === brand && childSnapshot.key !== id) {
            watches.push({ id: childSnapshot.key, ...childSnapshot.val() });
          }
        });
        setSimilarWatches(watches);
      });
    },
    [id]
  );

  useEffect(() => {
    const watchRef = ref(database, `watches/${id}`);
    onValue(watchRef, (snapshot) => {
      const data = snapshot.val();
      setWatch(data);
      if (data && data.brand) {
        fetchSimilarWatches(data.brand);
      }
    });
  }, [id, fetchSimilarWatches]);

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % (watch.images ? watch.images.length : 1)
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + (watch.images ? watch.images.length : 1)) %
        (watch.images ? watch.images.length : 1)
    );
  };

  if (!watch) {
    return (
      <div className="loading">Loading exquisite timepiece details...</div>
    );
  }

  const currentUrl = window.location.href;

  const message = watch.available
    ? `Hello, I'm interested in the ${watch.brand} ${watch.model}. Could you provide more details about its availability? Here is where I found it: ${currentUrl}`
    : `Hello, I'd like to be notified when the ${watch.brand} ${watch.model} becomes available. Can you keep me updated? Here is the page I am watching: ${currentUrl}`;

  const whatsappURL = `https://api.whatsapp.com/send?phone=917510627261&text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="product-container">
      <div className="product-main">
        <div className="product-image">
          <div className="main-image-container">
            {watch.images && watch.images.length > 0 && (
              <>
                <img
                  src={
                    watch.images[currentImageIndex].url ||
                    watch.images[currentImageIndex].preview
                  }
                  alt={`${watch.brand} ${watch.model} - Main View`}
                  className="main-image"
                />
                <button className="image-nav prev" onClick={prevImage}>
                  &lt;
                </button>
                <button className="image-nav next" onClick={nextImage}>
                  &gt;
                </button>
              </>
            )}
            <div className="thumbnails">
              {watch.images &&
                watch.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.preview || image.url}
                    alt={`${watch.brand} ${watch.model} - Preview ${index + 1}`}
                    className={`thumbnail ${
                      index === currentImageIndex ? "active" : ""
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="product-details">
          <h1 className="product-name">
            {watch.brand} {watch.model}
          </h1>
          <p className="product-subtitle">
            Pre-Owned • {watch.brand} {watch.model}
          </p>
          <ul className="product-specs">
            <li>Brand: {watch.brand}</li>
            <li>Model: {watch.model}</li>
            <li>Movement: {watch.movement}</li>
            <li>Cost: Rs {watch.cost}</li>
            <li>Strap: {watch.strap}</li>
            <p>Category: {watch.category || "Men's Watches"}</p>
          </ul>
          <p className="availability">
            {watch.available
              ? "In Stock"
              : "This product is currently out of stock and unavailable."}
          </p>
          <button
            className="whatsapp-button"
            onClick={() => window.open(whatsappURL, "_blank")}
          >
            ORDER ON WHATSAPP
          </button>
          <div className="product-meta"></div>
        </div>
      </div>
      <h2>Similar Watches</h2>
      <div className="similar-watches">
        {similarWatches.map((watch) => (
          <ProductCard key={watch.id} watch={watch} />
        ))}
      </div>
    </div>
  );
};

export default Item;
