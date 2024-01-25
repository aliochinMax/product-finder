import React, { useState } from 'react';
import '../../src/styles/ImageAnalysis.css';


const ImageAnalysis = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);

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
    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1];

      // Access the API key from the environment variable
      const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_VISION_API;

      // Make API request to Google Cloud Vision API endpoint using fetch
      const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [{ image: { content: base64Image }, features: [{ type: 'WEB_DETECTION' }] }],
        }),
      });

      // Process the API response
      const responseData = await response.json();
      console.log('API Response:', responseData);

      // Update state with the analysis results
      setAnalysisResults(responseData.responses[0].webDetection);

      console.log('Image analyzed successfully!');
    };
    reader.readAsDataURL(selectedImage);
  };

  return (
<div className="center-container">
  <div className="button-container">
    <label className="file-input-container">
      <input type="file" className="file-input" onChange={handleImageChange} />
      <span className="upload-image-button">Choose File</span>
    </label>
    <button className='submit-upload' onClick={handleUploadAndAnalyze}>Upload and Analyze Image</button>
  </div>
    
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
  );
};

export default ImageAnalysis;
