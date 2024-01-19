// ProductCarousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from './ProductCard'; // Assuming you have a ProductCard component

const ProductCarousel = ({ products }) => {
  // Sort products based on price (from lowest to highest)
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
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
    <Slider {...settings}>
      {sortedProducts.map((product, index) => (
        <ProductCard
          key={index}
          retailer={product.retailer}
          img={product.img}
          rating={product.rating}
          name={product.name}
          description={product.description}
          price={product.price}
          isBest={index === 0} // The first product after sorting will have the lowest price
        />
      ))}
    </Slider>
  );
};

export default ProductCarousel;