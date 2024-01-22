import React, { useState } from 'react';
import ImageViewer from './components/ImageViewer';
import ImageUploader from './components/Uploader';
import ResultsViewer from './components/ResultsViewer';
import RealTimeProductSearch from './components/ProductResult';

const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState(null);

  const handleUpload = async (base64Data) => {
    try {
      const response = await fetch('/.netlify/functions/annotate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          base64Data,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      setImageUrl(`data:image/jpeg;base64,${base64Data}`);
      setResult(result);
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };

  return (
    <div>
      <RealTimeProductSearch />
      <ImageUploader onUpload={handleUpload} />
      {imageUrl && <ImageViewer imageUrl={imageUrl} />}
      {result && <ResultsViewer result={result} />}
    </div>
  );
};

export default App;
