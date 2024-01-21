import '../../styles/ProductCard.css'
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {IoIosArrowForward, IoIosArrowBack, IoIosStar,  IoIosStarHalf, IoIosStarOutline } from "react-icons/io";







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



function ProductCard({images,name,price,isBest,description,link, rating, retailer,shipping}){
  const stars = convertRatingToStars(rating);
  const cardClassName = `product-card ${isBest ? 'best-value' : ''}`;

  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

  };

 
  return(
   <div className={cardClassName}>
    {Array.isArray(images) && images.length > 0 ? (
        <Slider {...sliderSettings}>
          {images.map((image, index) => (
            <div key={index} className="product-image-container">
              <img className="product-image" src={image} alt={name}></img>
            </div>
          ))}
        </Slider>
      ) : (
        // Handle the case when images is not an array or is empty
        <div className="product-image-container">
          <img className="product-image" src="default-image.jpg" alt={name}></img>
        </div>
      )}
        <div className="product-details">
         <h3 className="product-name">{name}</h3> <h3 className='product-price'>£{price} {shipping === 0 ? (
    <span className='product-shipping'>Free Shipping</span>
  ) : (
    <span className='product-shipping'>+ £{shipping} Shipping</span>
  )}</h3>
         <div className="product-rating">  {rating !== null ? (
            stars.map((star, index) => (
              <span key={index}>{star}</span>
            ))
          ) : (
            <span>No Rating Found</span>
          )}</div> <div className='product-retailer'>from {retailer}</div>
         <p className='product-description'>{description}</p> 
         <button className='product-link' onClick={() => openRetailerSite(link)}>Go to Buy</button>
        </div>
    </div>
   )
}

export default ProductCard