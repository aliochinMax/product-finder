import '../styles/ProductCard.css'

function ProductCard({img,name,price,isExact,description,link}){
   return(
   <div className="product-card">
        <div className="product-image-container"><img className="product-image" src={img}></img></div>
        <div className="product-details"><h3 className="product-name">{name}</h3> <h3 className='product-price'>{price}</h3> <p className='product-description'>{description}</p>  </div>
    </div>
   )
}

export default ProductCard