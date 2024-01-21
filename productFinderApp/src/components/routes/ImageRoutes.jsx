// src/routes/ImageRoutes.jsx

import express from 'express';
import multer from 'multer';
import { processImage } from '../components/VisionProcessor';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/process_image', upload.single('image'), async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;

    // Process the image using the VisionProcessor component
    const dynamicProductId = await processImage(imageBuffer);

    // Handle the result or store it in your database
    console.log('Dynamic Product ID:', dynamicProductId);

    res.status(200).send('Image processed successfully');
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
