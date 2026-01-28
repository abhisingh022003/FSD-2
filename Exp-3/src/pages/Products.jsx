import { Link } from 'react-router-dom';

const PRODUCTS = [
  { id: 1, name: 'React Router Guide', price: '$29.99' },
  { id: 2, name: 'SPA Development', price: '$39.99' },
  { id: 3, name: 'Web Development Pro', price: '$49.99' },
  { id: 4, name: 'Advanced React', price: '$59.99' },
];

export default function Products() {
  return (
    <div className="page-container">
      <h1>Products</h1>
      <p>Browse our collection of courses and products:</p>
      <div className="products-grid">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="price">{product.price}</p>
            <Link to={`/products/${product.id}`} className="btn">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
