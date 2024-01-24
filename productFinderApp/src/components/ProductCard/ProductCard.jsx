import '../../styles/ProductCard.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {IoIosArrowForward, IoIosArrowBack, IoIosStar,  IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import React, { useState, useEffect } from 'react';
import 'react-responsive-modal/styles.css';
import ImageCarousel from './imageCarousel';
import { HiOutlineShoppingBag } from "react-icons/hi";




function extractShippingPrice(shippingInfo) {
  
  if (typeof shippingInfo === 'string') {
    // Extract the numerical part using regex
    const match = shippingInfo.match(/£(\d+(\.\d{1,2})?)/);

    if (match) {
      return `+ ${match[0]} shipping`;
    }
  }

  //there is an edge case bug here, as this line triggers the Free shipping text to be rendered, which may be false as the api may just not have the info
  //however the api doesn't return 0 when it does detect that there is free shipping, so not my problem nor my fault
  return 0; 
}



const convertRatingToStars = (rating) => {
   const intRating = Math.trunc(rating); //Gets whole number of rating without decimal, DOES NOT ROUND e.g 4.7 => 4
   const remainder = rating - intRating;
   const stars = [];
   
   // Adds full stars
   for (let i = 0; i < intRating; i++) {
     stars.push(<IoIosStar key={i} />);
   }
   // Adds half star if remainder is greater than 0.2. 0.201 value is used as real values are weird in JS
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

function truncateDescription(desc) {
  // Truncate the description to 200 characters
  if(desc){ //In case desc is null
    return desc.length > 200 ? desc.substring(0, 200) : desc;
  }
}



function ProductCard({ images, name, price, isBest, description, link, rating, retailer, shipping }) {
  
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const stars = convertRatingToStars(rating);
  const cardClassName = `product-card ${isBest ? 'best-value' : ''}`;
  const shippingPrice = extractShippingPrice(shipping)
 
  const truncatedDescription = isDescriptionExpanded ? description : truncateDescription(description);


  // console.log(`${name}, ${shipping}, ${shippingPrice}`)
  return (
    <div className={cardClassName}>
       {Array.isArray(images) && images.length > 0 ? (
        <ImageCarousel images={images} />
      ) : (
        <div className="product-image-container">
          <img
            className="product-image"
            src="../../assets/images/errorImgCouldNotBeFound.png"
            alt={name}
          ></img>
        </div>
      )}
      <div className="product-details">
        <h3 className="product-name">{name}</h3>
        <div className="product-price-details">
        <h3 className="product-price">
          £{price}
        </h3>

          {shippingPrice === 0 ? (
            <span className="product-shipping">Free Shipping</span>
          ) : (
            <span className="product-shipping">{shippingPrice}</span>
          )}
        </div>
        <div className="product-rating">
          {rating !== null ? (
            stars.map((star, index) => <span key={index}>{star}</span>)
          ) : (
            <span>No Rating Found</span>
          )}
        </div>{' '}
        <div className="product-retailer">from {retailer}</div>
        <p className="product-description">
          {truncatedDescription ? (
            <>
              {truncatedDescription}
              {/*Techincally the "&& description &&" doesnt need to be included here and is an artifact before the item desc could not be found was implemented but i feel safer with it here  */}
              {!isDescriptionExpanded && description && description.length > 200 && ( 
                <span
                  className="see-more"
                  onClick={() => setIsDescriptionExpanded(true)}
                >
                 ... See More
                </span>
              )}
            </>
          ) : (
            "Item description could not be found"
          )}
        </p>{' '}
        <button className="product-link" onClick={() => openRetailerSite(link)}>
        <HiOutlineShoppingBag />
        </button>{' '}
    </div>
    </div>
  );
}

export default ProductCard;