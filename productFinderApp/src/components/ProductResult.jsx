import React, { useState, useEffect } from 'react';
import axios from 'axios';
import errorImg from '../assets/images/errorImgCouldNotBeFound.png'
import ProductGrid from './ProductGrid';


const RealTimeProductSearch = () => {
  const [productName, setProductName] = useState('');
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const modifyData = (products) => {

    return productData.data.map((product) => {
      // Check if product.offer.shipping exists
      const shippingValue = product.offer.shipping ? ~~product.offer.shipping.replace(/£/g, '') : 0;
      const imagesValue = Array.isArray(product.product_photos) ? product.product_photos : [product.product_photos];


      return {
        name: product.product_title,
        description: product.product_description,
        retailer: product.offer.store_name,
        rating: product.offer.store_rating,
        price: ~~product.offer.price.replace(/£/g, ''),
        shipping: shippingValue,
        link: product.offer.offer_page_url,
        images: imagesValue,
      };
    });
  }

  const fetchData = async () => {
    // const apiKey = import.meta.env.REACT_APP_RAPIDAPI_KEY;
    // const apiHost = import.meta.env.REACT_APP_RAPIDAPI_HOST;

    const options = {
      method: 'GET',
      url: 'https://real-time-product-search.p.rapidapi.com/search',
      params: {
        q: productName,
        country: 'gb',
        language: 'en',
        limit: 29,
        sort_by: 'LOWEST_PRICE',
      },
      headers: {
        'X-RapidAPI-Key':import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host':import.meta.env.VITE_REACT_APP_RAPIDAPI_HOST
      },
    };

    try {
      setLoading(true);


      const response = await axios.request(options);
      setProductData(response.data);
    } catch (error) {
      setError(error);
      console.error('Error fetching data:', error.response);
    } finally {
      setLoading(false);
    }
  };


  const handleButtonClick = () => {
    if (productName) {
      fetchData();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Enter product name"
      />

      <button onClick={handleButtonClick} disabled={loading}>
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {Array.isArray(productData?.data) && productData.data.length > 0 && (
  <div>
    {console.log(productData)}
    <ProductGrid products={modifyData(productData)}/>
  </div>
)}

    </div>
  );
};

export default RealTimeProductSearch;