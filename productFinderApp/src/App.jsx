import React, { useState } from 'react';
import ImageUploader from '../product-detection-frontend/vite-project/src/ImageUploader';
import ProductSet from '../product-detection-frontend/vite-project/src/ProductSet';

const App = () => {
  const [imageAnalysisData, setImageAnalysisData] = useState(null);

  const handleImageAnalysis = (data) => {
    // Update state with data from ImageUploader component
    setImageAnalysisData(data);
  };

  return (
    <div>
      <ImageUploader onImageAnalysis={handleImageAnalysis} />
      {imageAnalysisData && <ProductSet visionData={imageAnalysisData} />}
    
    </div>
  );
};

export default App;
