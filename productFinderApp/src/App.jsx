import { useState } from 'react'
import ProductCard from './components/ProductCard'
function App() {

  return (
    <div>
    <ProductCard retailer="Amazon" img="hello.png" rating="2.2"name="product" description="description" price="price"></ProductCard>
    </div>
  )
}

export default App
