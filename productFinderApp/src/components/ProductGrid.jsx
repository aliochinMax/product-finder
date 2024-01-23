import React, { useState } from 'react';
import ProductCard from './ProductCard/ProductCard';
import '../styles/ProductGrid.css'
const ProductGrid = ({ products }) => {
  //Controls 
  const itemsPerRow = 3; 
  const rowsPerLoad = 2;

  const [loadedRows, setLoadedRows] = useState(rowsPerLoad);

  const loadMoreRows = () => {
    const remainingRows = Math.ceil((products.length - loadedRows) / itemsPerRow);
    const rowsToLoad = Math.min(rowsPerLoad, remainingRows);
    setLoadedRows((prevLoadedRows) => prevLoadedRows + rowsToLoad);
  };

  const visibleProducts = products.slice(0, loadedRows * itemsPerRow);

  return (
    <section>
    <header className='section-title'>
      <h2>Similar Products</h2>
      <p>Found {products.length} products</p>
      </header>
      {Array.from({ length: loadedRows }).map((_, rowIndex) => (
        <div key={rowIndex} className="product-grid-row">
          {visibleProducts.slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow).map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      ))}

      {loadedRows * itemsPerRow < products.length && (
        <button onClick={loadMoreRows}>Load More</button>
      )}
    </section>
  );
};

export default ProductGrid;