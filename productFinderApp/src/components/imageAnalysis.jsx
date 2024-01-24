import React, { useState } from 'react';
import ProductGrid from "./ProductGrid";
import axios from "axios";

const ImageAnalysis = () => {
  const [productName, setProductName] = useState("");
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const modifyData = (products) => {
      return productData.data.map((product) => {
        // Check if product.offer.shipping exists
        const shippingValue = product.offer.shipping ? product.offer.shipping : 0;
        const imagesValue = Array.isArray(product.product_photos) ? product.product_photos : [product.product_photos];


        return {
          name: product.product_title,
          description: product.product_description,
          retailer: product.offer.store_name,
          rating: product.offer.store_rating,
          price: product.offer.price.replace(/£/g, ''),
          shipping: shippingValue,
          link: product.offer.offer_page_url,
          images: imagesValue,
        };
      });
    };

    const extractItemNameFromResponse = (response) => {
      // Check if response is valid and has fullTextAnnotations
      if (response?.data?.responses?.[0]?.fullTextAnnotation) {
        const extractedText = response.data.responses[0].fullTextAnnotation.text;
        setProductName(extractedText);
        return extractedText;
      }
      // If item is not recognized, return a default value
      return "Unknown Item";
    };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUploadAndAnalyze = async () => {
    if (!selectedImage) {
      alert('Please select an image first.');
      return;
    }

    // Convert the image to a base64-encoded string
    const reader = new FileReader();
    reader.onload = async () => {
      const imageContent = reader.result.split(",")[1];

      // set the endpoint for the google vision api
      const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_VISION_API;

      try {
        const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requests: [{ image: { content: imageContent }, features: [
              { type: 'WEB_DETECTION' },
              {
              type: "PRODUCT_SEARCH",
              maxResults: 10,
            },
            {
              type: "LABEL_DETECTION",
              maxResults: 5,
            },
            {
              type: "LOGO_DETECTION",
              maxResults: 5,
            },
            {
              type: "TEXT_DETECTION",
              maxResults: 5,
            },
            ] }],
          }),
        });

        const responseData = await response.json();
        // retrieve the name of the product from the Google API
        console.log('Google Vision API Response:', response);

        const itemName = extractItemNameFromResponse(response);
        setProductName(itemName);
        fetchData(itemName);
        setAnalysisResults(responseData.responses[0].webDetection);
      } catch (error) {
        setError(error);
        console.error("Error processing image:", error);
      }
    };
    reader.readAsDataURL(selectedImage);
  };



  const fetchData = async (itemName) => {
    const options = {
      method: "GET",
      url: "https://real-time-product-search.p.rapidapi.com/search",
      params: {
        q: itemName,
        country: "gb",
        language: "en",
        limit: 29,
        sort_by: "LOWEST_PRICE",
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_REACT_APP_RAPIDAPI_HOST,
      },
    };

    try {
      setLoading(true);
      const response = await axios.request(options);
      setProductData(response.data);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error.response);
    } finally {
      setLoading(false);
    }
  };


  return (
<>
    <div>
      <input type="file" onChange={handleImageChange} />
      <br />
      <button onClick={handleUploadAndAnalyze}>Upload and Analyze Image</button>

      {analysisResults && (
        <div>
          <h2>Analysis Results:</h2>
          <ul>
            {analysisResults.webEntities.map((entity, index) => (
              <li key={index}>{entity.description}</li>
            ))}
          </ul>

          <h2>Matching Images:</h2>
          <ul>
            {analysisResults.visuallySimilarImages.map((image, index) => (
              <li key={index}>
                <img src={image.url} alt={`Matching Image ${index + 1}`} />
                <p>URL: <a href={image.url} target="_blank" rel="noopener noreferrer">{image.url}</a></p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {Array.isArray(productData?.data) && productData.data.length > 0 && (
          <div>
            {console.log(productData)}
            <ProductGrid products={modifyData(productData)} />
          </div>
        )}
      </div>
</>
  );
};

export default ImageAnalysis;

