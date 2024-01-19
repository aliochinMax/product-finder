import '../styles/ProductCard.css'
import { IoIosStar,  IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

const convertRatingToStars = (rating) => {
   const intRating = Math.trunc(rating);
   const remainder = rating - intRating;
   const stars = [];
   // Adds full stars
   for (let i = 0; i < intRating; i++) {
     stars.push(<IoIosStar key={i} />);
   }
   // Adds half star if remainder is greater than 0.2
   if (remainder > 0.201) {
     stars.push(<IoIosStarHalf key="half" />);
   }
   // Adds empty stars to reach a total of 5 stars
   while (stars.length < 5) {
     stars.push(<IoIosStarOutline key={stars.length} />);
   }
   return stars;
 };

 const openRetailerSite = (link) => {
  window.open(link, '_blank');
};



function ProductCard({img,name,price,isBest,description,link, rating, retailer}){
  
  const stars = convertRatingToStars(rating);
  const cardClassName = `product-card ${isBest ? 'best-value' : ''}`;

  return(
   <div className={cardClassName}>
        <div className="product-image-container"><img className="product-image" src={img}></img></div>
        <div className="product-details">
         <h3 className="product-name">{name}</h3> <h3 className='product-price'>£{price}</h3>
         <div className="product-rating"> {stars.map((star, index) => (
          <span key={index}>{star}</span>
        ))}</div> <div className='product-retailer'>from {retailer}</div>
         <p className='product-description'>{description}</p> 
         <button className='product-link' onClick={() => openRetailerSite(link)}>Go to Buy</button>
        </div>
    </div>
   )
}

export default ProductCard