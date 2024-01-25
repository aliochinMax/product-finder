import React, { useState } from 'react';
import '../../src/styles/ImageAnalysis.css';
import ProductCarousel from "./ProductCarousel";
import ProductGrid from "./ProductGrid";
import {handleImageUpload} from "./utils/ImageHandlingAndApiCall"
import { handleUploadAndAnalyze } from './utils/handleUploadAndAnalyze';
import AnalysisResults from './analysisResults';
const ImageAnalysis = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);

  //Sorry abigail for cluttering your code with these states sadly I cannot get rid of them due to how ProductResults was set up and my lack of brain power
  const [productName, setProductName] = useState("");
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const handleUploadAndAnalyzeWrapper = () => {
    handleUploadAndAnalyze(selectedImage, setProductName, setError, setLoading, setProductData, setAnalysisResults);
  }
  
  return (
    <>
  <div className="center-container">
    <div className="button-container">
      <label className="file-input-container">
        <input type="file" className="file-input" onChange={handleImageChange} />
        <span className="upload-image-button">Choose File</span>
      </label>
      <button className='submit-upload' onClick={handleUploadAndAnalyzeWrapper}>Upload and Analyze Image</button>
    </div>
    </div>
    {
      <>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {productData && Array.isArray(productData) && productData.length > 0 && (
            <div>
              <ProductCarousel products={productData} />
              <ProductGrid products={productData} />
            </div>
          )}
          </>
    }
    <AnalysisResults analysisResults={analysisResults}/>
      </>
    );
  };

export default ImageAnalysis;
