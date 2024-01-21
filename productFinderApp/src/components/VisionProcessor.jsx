// src/components/VisionProcessor.jsx

const { ImageAnnotatorClient } = require('@google-cloud/vision');

const processImage = async (imageBuffer) => {
  const client = new ImageAnnotatorClient();

  // Process the image using the Google Vision API
  const [result] = await client.productSearch({
    // Include the necessary parameters for image processing
    image: { content: imageBuffer },
  });

  // Extract relevant information from the result
  const ocrText = result?.textAnnotations?.[0]?.description || '';
  const labels = result?.labelAnnotations?.[0]?.description || '';
  const webEntities = result?.webDetection?.webEntities?.[0]?.description || '';
  const logos = result?.logoAnnotations?.[0]?.description || '';

  // Construct the dynamic product ID
  const dynamicProductId = [
    ocrText.trim() || 'No data available',
    labels.trim() || 'No data available',
    webEntities.trim() || 'No data available',
    logos.trim() || 'No data available',
  ].join('-');

  return dynamicProductId;
};

export { processImage };
