import React, { useState } from 'react';
import '../../src/styles/ImageAnalysis.css';
import ProductCarousel from "./ProductCarousel";
import ProductGrid from "./ProductGrid";
import {handleImageUpload} from "./utils/ImageHandlingAndApiCall"
import AnalysisResults from './analysisResults';
import ProductDisplay from "./ProductDisplay";
import { useAppState } from "./AppState"

const ImageAnalysis = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const { productData, analysisResults, loading, error, updateState, handleUploadAndAnalyze } = useAppState();

  //Sorry abigail for cluttering your code with these states sadly I cannot get rid of them due to how ProductResults was set up and my lack of brain power
  const [productName, setProductName] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const handleUploadAndAnalyzeWrapper = () => {
    handleUploadAndAnalyze(selectedImage, setProductName);
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
    <ProductDisplay
        productData={productData}
        analysisResults={analysisResults}
        loading={loading}
        error={error}
      />
      </>
    );
  };

export default ImageAnalysis;
