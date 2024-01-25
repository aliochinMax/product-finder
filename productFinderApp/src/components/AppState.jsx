import { createContext, useState, useContext } from "react";
import { handleImageUpload } from "./utils/handleImageUpload";
const AppStateContext = createContext();

export const useAppState = () => {
  return useContext(AppStateContext);
};

export const AppStateProvider = ({ children }) => {
  const [productData, setProductData] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateState = (newState) => {
    setProductData(newState.productData || productData);
    setAnalysisResults(newState.analysisResults || analysisResults);
    setLoading(newState.loading || loading);
    setError(newState.error || error);
  };

  const handleUploadAndAnalyze = async (selectedImage) => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    const utilResponse = await handleImageUpload(selectedImage, setError, setLoading);
    setProductData(utilResponse);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(",")[1];
      const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_VISION_API;

      const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64Image,
              },
              features: [
                {
                  type: "WEB_DETECTION",
                },
              ],
            },
          ],
        }),
      });

      const responseData = await response.json();
      console.log("API Response:", responseData);

      setAnalysisResults(responseData.responses[0].webDetection);
      console.log("Image analyzed successfully!");
    };

    reader.readAsDataURL(selectedImage);
  };

  return (
    <AppStateContext.Provider
      value={{
        productData,
        analysisResults,
        loading,
        error,
        updateState,
        handleUploadAndAnalyze,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};