import React from 'react';

const ProductSet = ({ visionData }) => {
  const generateProductId = () => {
    if (!visionData) {
      return { productId: '', pagesWithMatchingImages: [] };
    }

    const ocrText = visionData.ocrText === 'No text detected' ? '' : visionData.ocrText;
    const firstLogo = visionData.logos && visionData.logos.length > 0 ? visionData.logos[0] : '';
    const firstLabel = visionData.labels && visionData.labels.length > 0 ? visionData.labels[0] : '';
    const firstWebEntity = visionData.webEntities && visionData.webEntities.length > 0
      ? visionData.webEntities[0]
      : '';

    const secondWebEntity = visionData.webEntities && visionData.webEntities.length > 1
      ? visionData.webEntities[1]
      : '';

    const pagesWithMatchingImages = visionData.pagesWithMatchingImages || [];

    // Concatenate non-empty values to create a product ID
    const productId = `${ocrText}${firstLogo ? `_${firstLogo}` : ''}${firstLabel ? `_${firstLabel}` : ''}${firstWebEntity ? `_${firstWebEntity}` : ''}${secondWebEntity ? `_${secondWebEntity}` : ''}`;

    return {
      productId,
      pagesWithMatchingImages,
    };
  };

  const { productId, pagesWithMatchingImages } = generateProductId();

  return (
    <div>
      <h2>Product Set Component</h2>
      <p>Product ID: {productId}</p>

      <h2>Pages with Matching Images:</h2>
      <ul>
        {pagesWithMatchingImages.map((page, index) => (
          <li key={index}>
            <a href={page} target="_blank" rel="noopener noreferrer">
              {page}
            </a>
          </li>
        ))}
      </ul>
     
    </div>
  );
};

export default ProductSet;
