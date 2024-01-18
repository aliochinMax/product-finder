const express = require('express');
const multer = require('multer');
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const cors = require('cors');

const app = express();
const port = 3002;

const upload = multer({ dest: 'uploads/' });

// Use cors middleware to enable CORS for all routes
app.use(cors());

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const client = new ImageAnnotatorClient({ keyFilename: './google-cloud-key.json' });

    // Perform OCR, label detection, logo detection, web entities, and pages detection
    const [ocrResult] = await client.textDetection(`uploads/${req.file.filename}`);
    const [labelResult] = await client.labelDetection(`uploads/${req.file.filename}`);
    const [logoResult] = await client.logoDetection(`uploads/${req.file.filename}`);
    const [webResult] = await client.webDetection(`uploads/${req.file.filename}`);

    // Extract relevant information from the detection results
    const ocrText = ocrResult.textAnnotations.length > 0
      ? ocrResult.textAnnotations[0].description.trim()
      : 'No text detected';

    const labels = labelResult.labelAnnotations.map(label => label.description.trim());
    const logos = logoResult.logoAnnotations.map(logo => logo.description.trim());

    const webEntities = webResult.webDetection.webEntities.map(entity => entity.description.trim());
    const pagesWithMatchingImages = webResult.webDetection.pagesWithMatchingImages.map(page => page.url);

    res.json({ ocrText, labels, logos, webEntities, pagesWithMatchingImages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
