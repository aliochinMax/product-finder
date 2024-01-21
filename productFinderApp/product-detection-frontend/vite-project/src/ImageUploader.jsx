import React, { useState } from 'react';
import axios from 'axios';
import ProductSet from './ProductSet'; 

const ImageUploader = ({ onImageAnalysis }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [results, setResults] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Pass the data to the parent component
      onImageAnalysis(response.data);
      setResults(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {results && (
        <div>
          <h2>OCR Text:</h2>
          <p>{results.ocrText}</p>

          <h2>Logos:</h2>
          <ul>
            {results.logos.map((logo, index) => (
              <li key={index}>{logo}</li>
            ))}
          </ul>

          <h2>Labels:</h2>
          <ul>
            {results.labels.map((label, index) => (
              <li key={index}>{label}</li>
            ))}
          </ul>

          <h2>Web Entities:</h2>
          <ul>
            {results.webEntities.map((entity, index) => (
              <li key={index}>{entity}</li>
            ))}
          </ul>

          {/* Pass visionData to ProductSet component */}
          <ProductSet visionData={results} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
