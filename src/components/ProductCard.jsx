import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

const ProductCard = ({ watch }) => {
  if (!watch) {
    return <div className={styles.productCardSkeleton}></div>;
  }

  return (
    <div className={styles.productCard}>
      <Link to={`/watch/${watch.id}`} className={styles.productLink}>
        <div className={styles.productImageContainer}>
          <img 
            src={watch.images?.[0]?.url || 'placeholder-image-url.jpg'} 
            alt={`${watch.brand} ${watch.model}`} 
            className={styles.productImage} 
          />
          {watch.available ? (
            <span className={`${styles.productBadge} ${styles.inStock}`}>In Stock</span>
          ) : (
            <span className={`${styles.productBadge} ${styles.outOfStock}`}>Out of Stock</span>
          )}
        </div>
        <div className={styles.productInfo}>
          <h2 className={styles.productBrand}>{watch.brand}</h2>
          <h3 className={styles.productModel}>{watch.model}</h3>
          <div className={styles.productDetails}>
            <span className={styles.productMovement}>{watch.movement}</span>
            <span className={styles.productStrap}>{watch.strap}</span>
          </div>
          <div className={styles.productFooter}>
            <span className={styles.productPrice}>
              {watch.cost 
                ? `₹${watch.cost.toLocaleString('en-IN')}`
                : 'Price on request'}
            </span>
            <span className={styles.knowMoreButton}>View Details</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;