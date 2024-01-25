import axios from "axios";
import heic2any from "heic2any";
import { imageFileResizer } from "react-image-file-resizer";

// Utility function to handle image upload
export const handleImageUpload = async (
    imageFile,
    setProductName,
    setError,
    setLoading,
    fetchData
  ) => {
    try {
      let convertedImage;
  
      if (
        imageFile.type.startsWith("image/svg+xml") ||
        imageFile.type.startsWith("image/png") ||
        imageFile.type.startsWith("image/jpeg")
      ) {
        convertedImage = imageFile;
      } else {
        convertedImage = await heic2any({ blob: imageFile });
      }
  
      const reader = new FileReader();
  
      // Wrap the entire asynchronous operation in a Promise
      const visionApiResponse = await new Promise((resolve, reject) => {
        reader.onload = async () => {
          const imageContent = reader.result.split(",")[1];
  
          const visionApiEndpoint =
            "https://vision.googleapis.com/v1/images:annotate";
          const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_VISION_API;
  
          try {
            const response = await axios.post(
              `${visionApiEndpoint}?key=${apiKey}`,
              {
                requests: [
                  {
                    image: {
                      content: imageContent,
                    },
                    features: [
                      { type: "PRODUCT_SEARCH", maxResults: 10 },
                      { type: "LABEL_DETECTION", maxResults: 5 },
                      { type: "LOGO_DETECTION", maxResults: 5 },
                      { type: "TEXT_DETECTION", maxResults: 5 },
                    ],
                  },
                ],
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
  
            resolve(response);
          } catch (error) {
            reject(error);
          }
        };
  
        reader.readAsDataURL(convertedImage);
      });
  
      console.log("Google Vision API Response:", visionApiResponse);
  
      const itemName = extractItemNameFromResponse(
        visionApiResponse,
        setProductName
      );
      setProductName(itemName);
  
      // Pass setLoading as an argument to the fetchData function
      const fetchResponse = await fetchData(
        itemName,
        setLoading,
        setProductName,
        setError
      );
  
    //   console.log(`Fetch Response ${fetchResponse}`);
      return fetchResponse;
    } catch (error) {
      setError(error);
      console.error("Error handling image:", error);
    }
  };
// Utility function to extract item name from response
export const extractItemNameFromResponse = (response, setProductName) => {
  if (response?.data?.responses?.[0]?.fullTextAnnotation) {
    const extractedText = response.data.responses[0].fullTextAnnotation.text;
    setProductName(extractedText);
    return extractedText;
  }
  return "Unknown Item";
};

// Utility function to fetch data from real-time-data API
export const fetchData = async (
    itemName,
    setLoading,
    setProductData,
    setError
  ) => {
    let retrievedData;
    const options = {
      method: "GET",
      url: "https://real-time-product-search.p.rapidapi.com/search",
      params: {
        q: itemName,
        country: "gb",
        language: "en",
        limit: 29,
        sort_by: "LOWEST_PRICE",
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_REACT_APP_RAPIDAPI_HOST,
      },
    };
  
    try {
      setLoading(true);
      const response = await axios.request(options);
      retrievedData = response.data;
      console.log(retrievedData)
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error.response);
    } finally {
      setLoading(false);
      return JSON.stringify(retrievedData);
    }
  };