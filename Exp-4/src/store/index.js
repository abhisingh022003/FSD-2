import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';

// Load state from localStorage
const loadState = () => {
  try {
    const serialized = localStorage.getItem('reduxState');
    if (serialized === null) {
      return undefined;
    }
    return JSON.parse(serialized);
  } catch (err) {
    console.error('Error loading state:', err);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serialized = JSON.stringify({
      cart: state.cart // Only persist cart state
    });
    localStorage.setItem('reduxState', serialized);
  } catch (err) {
    console.error('Error saving state:', err);
  }
};

// Configure store with preloaded state
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    products: productReducer
  },
  preloadedState: loadState()
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
