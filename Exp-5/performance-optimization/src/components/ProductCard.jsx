import React from 'react';
import './ProductCard.css';

// Memoized ProductCard - only re-renders if props change
const ProductCard = React.memo(({ product, onClick }) => {
  console.log(`Rendering ProductCard: ${product.id}`);
  
  return (
    <div className="product-card" onClick={() => onClick?.(product)}>
      <img 
        src={product.imageUrl} 
        alt={product.name}
        loading="lazy"
        className="product-image"
      />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="category">{product.category} • {product.brand}</p>
        <p className="description">{product.description.slice(0, 80)}...</p>
        <div className="product-footer">
          <span className="price">${product.price}</span>
          <span className="rating">⭐ {product.rating}</span>
          <span className="stock">Stock: {product.stock}</span>
        </div>
      </div>
      {product.featured && <span className="badge">Featured</span>}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison - only re-render if product ID or onClick changes
  return prevProps.product.id === nextProps.product.id;
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
