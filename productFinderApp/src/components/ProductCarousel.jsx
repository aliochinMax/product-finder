// ProductCarousel.js
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from './ProductCard/ProductCard'; // Assuming you have a ProductCard component

function findSelectedProducts(productsData){
  let resultArray = [];

  if (productsData.length >= 5) {
    resultArray = [
      productsData[1],
      productsData[0],
      productsData[2],
      productsData[3],
      productsData[4]
    ];
  } else if (productsData.length >= 3) {
    resultArray = [
      productsData[1],
      productsData[0],
      productsData[2]
    ];
  }

  return resultArray;
}

const ProductCarousel = ({ products }) => {
  // Sort products based on price (from lowest to highest)
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);
  const selectedProducts = findSelectedProducts(sortedProducts);
  const [amountSlidesDisplayed, setAmountSlidesDisplayed] = useState(calculateSlides())
  
  function calculateSlides() {
    // Adjust the breakpoint value as needed
    const breakpoint = 2000; //For when 3 items do not fit
    const furtherBreakpoint = 1100; //For when only 1 item can fit
    if(window.innerWidth < furtherBreakpoint){
      return 1;
    }
    else if(window.innerWidth < breakpoint){
      return 2;
    }
    return 3;
  }

  useEffect(() => {
    function handleResize() {
      setAmountSlidesDisplayed(calculateSlides());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  if (selectedProducts.length === 0) {
    // If there are no selected products dont render anything
    console.log("No selected products found");
    return null; 
  }
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: amountSlidesDisplayed,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    
    <section className='selected-products-section'>
    <h1 className='section-title'>Cheapest Found Products</h1>
    <Slider {...settings}  >
      {selectedProducts.map((product, index) => (
       <ProductCard key={index} isBest={index === 1} {...product} />
      ))}
    </Slider>
    </section>
  );
      
};

export default ProductCarousel;