// frontend/src/components/FormComponent.js

import React, { useState } from 'react';

const FormComponent = ({ onSubmit }) => {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('electronics');
  const [productId, setProductId] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass form data to the parent component for further processing
    onSubmit({ image, category, productId });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Choose an image:
        <input type="file" onChange={handleFileChange} accept="image/*" />
      </label>

      <label>
        Select a category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          {/* Add more options as needed */}
        </select>
      </label>

      <label>
        Enter Product ID:
        <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
      </label>

      <button type="submit">Upload and Identify</button>
    </form>
  );
};

export default FormComponent;
