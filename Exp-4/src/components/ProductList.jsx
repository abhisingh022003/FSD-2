import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLanguage } from '../context/LanguageContext';
import {
  fetchProducts,
  selectProducts,
  selectProductsLoading,
  selectProductsError,
  selectCategories,
  setCategory,
  setSearchQuery
} from '../store/slices/productSlice';
import { addItem } from '../store/slices/cartSlice';

function ProductList() {
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  if (loading) {
    return (
      <div className="product-list">
        <h3>{t('products')}</h3>
        <div className="loading">⏳ Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list">
        <h3>{t('products')}</h3>
        <div className="error">❌ Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h3>{t('products')}</h3>
      
      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label>Category:</label>
          <select onChange={(e) => dispatch(setCategory(e.target.value))}>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">{product.image}</div>
              <h4>{product.name}</h4>
              <p className="product-category">{product.category}</p>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <button 
                onClick={() => handleAddToCart(product)}
                className="btn-add-cart"
              >
                {t('addToCart')}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductList;
