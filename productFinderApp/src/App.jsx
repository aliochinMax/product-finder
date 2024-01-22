import React, { useState } from "react";
import RealTimeProductSearch from "./components/ProductResult";
import ImageUploader from "./components/Uploader";
import ImageViewer from "./components/ImageViewer";
import ResultsViewer from "./components/ResultsViewer";

const App = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (base64Data) => {
    try {
      setLoading(true);
      setError(null);

      const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_VISION_API_KEY;

      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: base64Data,
                },
                features: [
                  { type: "LABEL_DETECTION" },
                  { type: "TEXT_DETECTION" },
                  { type: "WEB_DETECTION" },
                  { type: "DOCUMENT_TEXT_DETECTION" },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();
      setImageUrl(`data:image/jpeg;base64, ${base64Data}`);
      setResult(result);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while processing the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <RealTimeProductSearch />
      <ImageUploader onUpload={handleUpload} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageUrl && <ImageViewer imageUrl={imageUrl} />}
      {result && <ResultsViewer result={result} />}
    </div>
  );
};

export default App;
