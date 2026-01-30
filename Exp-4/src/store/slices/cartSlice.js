import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.total += item.price;
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      
      if (item) {
        state.total -= item.price * item.quantity;
        state.items = state.items.filter(i => i.id !== id);
      }
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      
      if (item) {
        item.quantity += 1;
        state.total += item.price;
      }
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.total -= item.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    }
  }
});

export const { 
  addItem, 
  removeItem, 
  incrementQuantity, 
  decrementQuantity, 
  clearCart 
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.total;
export const selectItemCount = (state) => 
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export default cartSlice.reducer;
