import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RealTimeProductSearch = () => {
  const [productName, setProductName] = useState('');
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const apiKey = import.meta.env.REACT_APP_RAPIDAPI_KEY;
    const apiHost = import.meta.env.REACT_APP_RAPIDAPI_HOST;

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
        'X-RapidAPI-Key': '069d45defemsh04d1fc0bc80dd35p1ae318jsna08154559401',
        'X-RapidAPI-Host': 'real-time-product-search.p.rapidapi.com',
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
    {productData.data.map((product, index) => (
      <div key={index}>
        <h2>{product.product_title}</h2>
        <p>{product.product_description}</p>
        <p>Store Name: {product.offer.store_name}</p>
        <p>Store Rating: {product.offer.store_rating}</p>
        <p>Price: {product.offer.price}</p>
        <p>Shipping: {product.offer.shipping}</p>
        <p>
          <a href={product.offer.offer_page_url} target="_blank" rel="noopener noreferrer">
            Retailer Website
          </a>
        </p>
      </div>
    ))}
  </div>
)}

    </div>
  );
};

export default RealTimeProductSearch;
