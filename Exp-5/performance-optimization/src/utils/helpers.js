// Utility functions for performance optimization

export const calculateExpensiveValue = (arr) => {
  console.log('🔄 Expensive calculation running...');
  // Simulate expensive operation
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i].price || 0;
  }
  return sum;
};

export const filterProducts = (products, searchTerm, category) => {
  console.log('🔍 Filtering products...');
  return products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !category || category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });
};

export const sortProducts = (products, sortBy) => {
  console.log('📊 Sorting products...');
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
};
