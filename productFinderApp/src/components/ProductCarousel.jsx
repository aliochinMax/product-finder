
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from './ProductCard/ProductCard'; 
import '../../src/styles/ProductCarousel.css'

function findSelectedProducts(productsData) {
  let resultArray = [];

  if (productsData.length >= 5) {
    resultArray = [
      productsData[1],
      productsData[0],
      productsData[2],
      productsData[3],
      productsData[4],
    ];
  } else if (productsData.length >= 3) {
    resultArray = [productsData[1], productsData[0], productsData[2]];
  }

  return resultArray;
}

const ProductCarousel = ({ products }) => {
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);
  const selectedProducts = findSelectedProducts(sortedProducts);
  const [amountSlidesDisplayed, setAmountSlidesDisplayed] = useState(
    calculateSlides()
  );

  function calculateSlides() {
    const breakpoint = 768;

    if (window.innerWidth < breakpoint) {
      return 1;
    }
    return 3; // Set to 3 for displaying 3 product cards in each slide
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
    console.log('No selected products found');
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
    <div className='carousel-container'>
      <section className='selected-products-section'>
        <h2 className='section-title'>Cheapest Products Found</h2>
        <Slider {...settings}>
          {selectedProducts.map((product, index) => (
            <ProductCard key={index} isBest={index === 1} {...product} />
          ))}
        </Slider>
      </section>
    </div>
  );
};

export default ProductCarousel;