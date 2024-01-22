// src/components/VisionProcessor.jsx
const { ImageAnnotatorClient } = require('@google-cloud/vision');

exports.handler = async function (event, context) {
  try {
    const { base64Data } = JSON.parse(event.body);

    // Convert base64 data to a Buffer
    const imageBuffer = Buffer.from(base64Data, 'base64');

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

    return {
      statusCode: 200,
      body: JSON.stringify({ dynamicProductId }),
    };
  } catch (error) {
    console.error('Error during image processing:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
