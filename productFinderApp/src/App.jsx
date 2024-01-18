import { useState } from 'react'
import ProductCard from './components/ProductCard'
function App() {

  return (
    <div>
    <ProductCard img="hello.png" name="product" description="description" price="price"></ProductCard>
    </div>
  )
}

export default App
