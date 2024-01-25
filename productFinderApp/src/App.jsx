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
import ImageAnalysis from './components/imageAnalysis';
import LogoJumbotron from './components/ProductCard/LogoJumbo';
import { AppStateProvider } from "./components/AppState";

const handleDrop = ({ over }) => {
  if (over) {
    console.log('Dropped over:', over);
  }
};

const App = () => {
  const [productData, setProductData] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <>
    <DndProvider backend={HTML5Backend}>
      <AppStateProvider>
      <div>
        <LogoJumbotron />
        
        
        <RealTimeProductSearch />
        <ImageAnalysis />
      </div>
      </AppStateProvider>
    </DndProvider>
    </>
  );
};

export default App;
