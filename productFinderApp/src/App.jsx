import { useState } from 'react'
import ProductCard from './components/ProductCard/ProductCard'
import ProductCarousel from './components/ProductCarousel'
import ProductGrid from './components/ProductGrid';import RealTimeProductSearch from './components/ProductResult'
import ImageCarousel from './components/ProductCard/imageCarousel';

function App() {
  
  return (
    <div><RealTimeProductSearch />
    <ImageCarousel images={["https://placehold.co/600x400","https://placehold.co/600x600","https://placehold.co/600x800"]}></ImageCarousel></div>
  )
}

export default App
