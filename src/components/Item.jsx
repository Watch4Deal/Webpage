import React from 'react';
import { useParams } from 'react-router-dom';
import watches from '../data/watches.json';

const Item = () => {
  const { id } = useParams();
  const watch = watches.find(w => w.id.toString() === id);

  if (!watch) {
    return <div>Watch not found</div>;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{watch.brand} - {watch.model}</h1>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        {watch.images.map((image, index) => (
          <img key={index} src={image} alt={`Watch ${index + 1}`} style={{ width: 200, height: 200, margin: '10px' }} />
        ))}
      </div>
      <h2>{watch.cost}</h2>
      <p>Model: {watch.model}</p>
      <p>Reference No: {watch.referenceNo}</p>
      <p>Size: {watch.size}</p>
      <p>Movement: {watch.movement}</p>
      <p>Condition: {watch.conditionOfO}</p>
      <p>Scope: {watch.scope}</p>
      <p>Description: {watch.description}</p>
    </div>
  );
};

export default Item;
