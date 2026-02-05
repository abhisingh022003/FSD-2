import React, { useMemo } from 'react';
import * as ReactWindow from 'react-window';
import ProductCard from './ProductCard';
import './VirtualizedProductList.css';

const { FixedSizeList } = ReactWindow;

const VirtualizedProductList = React.memo(({ products, onProductClick }) => {
  console.log('🎯 VirtualizedProductList rendering with', products.length, 'products');

  // Memoize row renderer
  const Row = useMemo(() => {
    return ({ index, style }) => {
      const product = products[index];
      return (
        <div style={style} className="virtual-row">
          <ProductCard product={product} onClick={onProductClick} />
        </div>
      );
    };
  }, [products, onProductClick]);

  // Calculate optimal list height
  const listHeight = Math.min(window.innerHeight - 300, 800);

  return (
    <div className="virtualized-list-container">
      <div className="list-info">
        <span>📊 Rendering {products.length} products with virtualization</span>
        <span className="performance-tip">
          ⚡ Only visible items are rendered for optimal performance
        </span>
      </div>
      <FixedSizeList
        height={listHeight}
        itemCount={products.length}
        itemSize={350}
        width="100%"
        className="virtualized-list"
      >
        {Row}
      </FixedSizeList>
    </div>
  );
});

VirtualizedProductList.displayName = 'VirtualizedProductList';

export default VirtualizedProductList;
