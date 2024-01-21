
import express from 'express';
import imageRoutes from './routes/ImageRoutes';

const app = express();
const port = 3001;

app.use('/api', imageRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});