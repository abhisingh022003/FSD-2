import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated async API call
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock product data
    return [
      { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', image: '💻' },
      { id: 2, name: 'Smartphone', price: 699.99, category: 'Electronics', image: '📱' },
      { id: 3, name: 'Headphones', price: 199.99, category: 'Electronics', image: '🎧' },
      { id: 4, name: 'Keyboard', price: 79.99, category: 'Accessories', image: '⌨️' },
      { id: 5, name: 'Mouse', price: 49.99, category: 'Accessories', image: '🖱️' },
      { id: 6, name: 'Monitor', price: 299.99, category: 'Electronics', image: '🖥️' },
      { id: 7, name: 'Webcam', price: 89.99, category: 'Accessories', image: '📷' },
      { id: 8, name: 'Tablet', price: 499.99, category: 'Electronics', image: '📱' }
    ];
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    filteredData: [],
    loading: false,
    error: null,
    selectedCategory: 'all',
    searchQuery: ''
  },
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filteredData = filterProducts(state.data, action.payload, state.searchQuery);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredData = filterProducts(state.data, state.selectedCategory, action.payload);
    },
    clearFilters: (state) => {
      state.selectedCategory = 'all';
      state.searchQuery = '';
      state.filteredData = state.data;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.filteredData = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Helper function to filter products
const filterProducts = (products, category, searchQuery) => {
  let filtered = products;
  
  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  
  if (searchQuery) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  return filtered;
};

export const { setCategory, setSearchQuery, clearFilters } = productSlice.actions;

export const selectProducts = (state) => state.products.filteredData;
export const selectAllProducts = (state) => state.products.data;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectCategories = (state) => {
  const categories = [...new Set(state.products.data.map(p => p.category))];
  return ['all', ...categories];
};

export default productSlice.reducer;
