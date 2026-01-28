import { useParams, useNavigate, Link } from 'react-router-dom';

const PRODUCTS = {
  1: {
    id: 1,
    name: 'React Router Guide',
    price: '$29.99',
    description: 'Complete guide to React Router v6 with practical examples.',
    details: [
      'Learn client-side routing',
      'Dynamic routes with parameters',
      'Nested routes and layouts',
      'Protected routes',
      'Advanced patterns',
    ],
  },
  2: {
    id: 2,
    name: 'SPA Development',
    price: '$39.99',
    description: 'Master Single Page Application development with React.',
    details: [
      'SPA architecture',
      'Component composition',
      'State management',
      'Routing techniques',
      'Performance optimization',
    ],
  },
  3: {
    id: 3,
    name: 'Web Development Pro',
    price: '$49.99',
    description: 'Complete web development course covering frontend and basics.',
    details: [
      'HTML/CSS fundamentals',
      'JavaScript advanced',
      'React framework',
      'Routing and navigation',
      'Best practices',
    ],
  },
  4: {
    id: 4,
    name: 'Advanced React',
    price: '$59.99',
    description: 'Advanced React patterns and best practices.',
    details: [
      'Hooks and custom hooks',
      'Performance tuning',
      'Code splitting',
      'Error boundaries',
      'Testing strategies',
    ],
  },
};

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS[productId];

  if (!product) {
    return (
      <div className="page-container error">
        <h1>Product Not Found</h1>
        <p>The product you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/products')} className="btn">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="product-detail">
        <h1>{product.name}</h1>
        <p className="price-large">{product.price}</p>
        <p className="description">{product.description}</p>
        
        <h2>What You'll Learn:</h2>
        <ul className="details-list">
          {product.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>

        <div className="button-group">
          <button 
            onClick={() => navigate('/products')} 
            className="btn btn-secondary"
          >
            Back to Products
          </button>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
