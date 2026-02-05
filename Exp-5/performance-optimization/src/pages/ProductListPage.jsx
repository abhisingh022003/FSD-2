import React, { useState, useMemo, useCallback } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import VirtualizedProductList from '../components/VirtualizedProductList';
import { products } from '../data/products';
import { filterProducts, sortProducts, calculateExpensiveValue } from '../utils/helpers';
import './ProductListPage.css';

const ProductListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Debounce search term to reduce filtering operations
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Memoize categories extraction
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(products.map(p => p.category))];
    console.log('📁 Calculating categories...');
    return cats;
  }, []);

  // Memoize filtered products - only recalculate when dependencies change
  const filteredProducts = useMemo(() => {
    return filterProducts(products, debouncedSearch, category);
  }, [debouncedSearch, category]);

  // Memoize sorted products
  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortBy);
  }, [filteredProducts, sortBy]);

  // Memoize expensive total calculation
  const totalValue = useMemo(() => {
    return calculateExpensiveValue(sortedProducts);
  }, [sortedProducts]);

  // useCallback to prevent function recreation
  const handleProductClick = useCallback((product) => {
    console.log('Product clicked:', product.name);
    setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  return (
    <div className="product-list-page">
      <header className="page-header">
        <h1>🚀 Performance Optimized Product List</h1>
        <p className="subtitle">Demonstrating React optimization techniques</p>
      </header>

      {/* Search and Filter Controls */}
      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search products (debounced 300ms)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <span className="search-info">
              Searching for: "{debouncedSearch}"
            </span>
          )}
        </div>

        <div className="filters">
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="default">Sort By: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="stats">
        <div className="stat-card">
          <span className="stat-label">Total Products</span>
          <span className="stat-value">{products.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Filtered Results</span>
          <span className="stat-value">{sortedProducts.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Value</span>
          <span className="stat-value">${totalValue.toLocaleString()}</span>
        </div>
      </div>

      {/* Optimization Info */}
      <div className="optimization-info">
        <h3>🎯 Active Optimizations:</h3>
        <ul>
          <li>✅ React.memo on ProductCard components</li>
          <li>✅ useMemo for filtering, sorting, and calculations</li>
          <li>✅ useCallback for event handlers</li>
          <li>✅ Debounced search (300ms)</li>
          <li>✅ Virtualized list (react-window)</li>
          <li>✅ Lazy loading images</li>
        </ul>
      </div>

      {/* Virtualized Product List */}
      <VirtualizedProductList 
        products={sortedProducts} 
        onProductClick={handleProductClick}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseModal}>×</button>
            <img 
              src={selectedProduct.imageUrl} 
              alt={selectedProduct.name}
              className="modal-image"
            />
            <h2>{selectedProduct.name}</h2>
            <p className="modal-category">{selectedProduct.category} • {selectedProduct.brand}</p>
            <p className="modal-description">{selectedProduct.description}</p>
            <div className="modal-details">
              <span className="modal-price">${selectedProduct.price}</span>
              <span className="modal-rating">⭐ {selectedProduct.rating}</span>
              <span className="modal-stock">Stock: {selectedProduct.stock}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
