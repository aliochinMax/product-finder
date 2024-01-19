import { useState } from 'react'
import ProductCard from './components/ProductCard'
import ProductCarousel from './components/ProductCarousel'
import ProductGrid from './components/ProductGrid';
function App() {
  const products = [
    {
      name: "Shoe",
      img: "hello.png",
      rating: "2.2",
      retailer: "Amazon",
      description: "description",
      price: "7.50",
    },
    {
      name: "Boot",
      img: "hello.png",
      rating: "2.2",
      retailer: "Amazon",
      description: "description",
      price: "3.50",
    },
    {
      name: "Hell",
      img: "hello.png",
      rating: "2.2",
      retailer: "Amazon",
      description: "description",
      price: "4.50",
    },
    {
      name: "Heaven",
      img: "hello.png",
      rating: "2.2",
      retailer: "Amazon",
      description: "description",
      price: "2.50",
    },
    {
      name: "Shoe",
      img: "hello.png",
      rating: "2.2",
      retailer: "Amazon",
      description: "description",
      price: "7.50",
    },
    {
      name: "Boot",
      img: "hello.png",
      rating: "2.2",
      retailer: "Amazon",
      description: "description",
      price: "3.50",
    },
    {
      name: "Hell",
      img: "hello.png",
      rating: "2.2",
      retailer: "Amazon",
      description: "description",
      price: "4.50",
    },
    {
      name: "Heaven",
      img: "hello.png",
      rating: "2.2",
      retailer: "Amazon",
      description: "description",
      price: "2.50",
    },
  ];
  return (
    <div>
    <ProductGrid products={products}/>
    </div>
  )
}

export default App
