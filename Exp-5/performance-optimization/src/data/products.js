// Generate 1000+ products for performance testing
export const generateProducts = (count = 1500) => {
  const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Toys', 'Food', 'Beauty'];
  const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'LG', 'Generic', 'Premium'];
  
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    category: categories[index % categories.length],
    brand: brands[index % brands.length],
    price: Math.floor(Math.random() * 1000) + 10,
    rating: (Math.random() * 5).toFixed(1),
    stock: Math.floor(Math.random() * 100),
    description: `This is a detailed description for Product ${index + 1}. It has amazing features and great quality.`,
    imageUrl: `https://picsum.photos/200/200?random=${index}`,
    featured: index % 10 === 0
  }));
};

export const products = generateProducts();
