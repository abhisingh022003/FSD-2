import { useState } from 'react'
import './App.css'
import ContextDemo from './components/ContextDemo'
import Counter from './components/Counter'
import ProductList from './components/ProductList'
import ShoppingCart from './components/ShoppingCart'

function App() {
  const [activeTab, setActiveTab] = useState('context')

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 State Management in React</h1>
        <p>Experiment 4: Context API & Redux Toolkit</p>
      </header>

      <nav className="tab-navigation">
        <button 
          className={`tab ${activeTab === 'context' ? 'active' : ''}`}
          onClick={() => setActiveTab('context')}
        >
          📦 Context API
        </button>
        <button 
          className={`tab ${activeTab === 'redux' ? 'active' : ''}`}
          onClick={() => setActiveTab('redux')}
        >
          🔄 Redux Toolkit
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'context' ? (
          <div className="section">
            <ContextDemo />
            <div className="info-box">
              <h4>ℹ️ Context API Features</h4>
              <ul>
                <li>✅ User Authentication (Login/Logout)</li>
                <li>✅ Theme Toggle (Light/Dark Mode)</li>
                <li>✅ Language Switching (English, Hindi, Spanish)</li>
                <li>✅ No external dependencies</li>
                <li>✅ Simple global state management</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="section">
            <Counter />
            <div className="redux-demo">
              <div className="products-section">
                <ProductList />
              </div>
              <div className="cart-section">
                <ShoppingCart />
              </div>
            </div>
            <div className="info-box">
              <h4>ℹ️ Redux Toolkit Features</h4>
              <ul>
                <li>✅ Shopping Cart Management</li>
                <li>✅ Async Product Fetching</li>
                <li>✅ Product Filtering & Search</li>
                <li>✅ LocalStorage Persistence</li>
                <li>✅ Redux DevTools Integration</li>
                <li>✅ Centralized State Store</li>
              </ul>
              <p className="devtools-hint">
                💡 Open Redux DevTools to see state changes in real-time!
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Full Stack - II (23CSH-382) | Experiment 4 | State Management</p>
        <p>By: Abhi Singh | Session: 2025-26</p>
      </footer>
    </div>
  )
}

export default App
