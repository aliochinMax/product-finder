import ProductCard from './components/ProductCard/ProductCard'
import ProductCarousel from './components/ProductCarousel'
import ProductGrid from './components/ProductGrid';
import ImageCarousel from './components/ProductCard/imageCarousel';
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import RealTimeProductSearch from './components/ProductResult';
import DragNDrop from './components/DragNDrop';
import { ItemTypes } from './components/ItemTypes';


const handleDrop = ({ over }) => {
  if (over) {
    console.log('Dropped over:', over);
  }
};

const App = () => {
  const [products, setProducts] = useState([]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {products.map((product) => (
          <DragNDrop key={product.name} text={product.name} dragType={ItemTypes.IMAGE} onDrop={handleDrop} />
        ))}
        <RealTimeProductSearch />
      </div>
    </DndProvider>
  );
};

export default App;
