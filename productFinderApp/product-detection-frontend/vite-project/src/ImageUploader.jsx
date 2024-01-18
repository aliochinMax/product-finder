import { useState } from 'react';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('http://localhost:3002/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('OCR Text:', data.ocrText);
      console.log('Detected Labels:', data.labels);
      console.log('Detected Logos:', data.logos);
      console.log('Detected Web Entities:', data.webEntities);
      console.log('Pages with Matching Images:', data.pagesWithMatchingImages);
      // Process and display the detected information on the frontend
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUploader;