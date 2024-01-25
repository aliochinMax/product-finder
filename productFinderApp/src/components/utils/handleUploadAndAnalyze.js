// import { handleImageUpload } from "./ImageHandlingAndApiCall";
// import { useAppState } from "../AppState"
// export const handleUploadAndAnalyze = async (selectedImage, setProductName, setError, setLoading,setProductData, setAnalysisResults) => {
//     if (!selectedImage) {
//       alert('Please select an image first.');
//       return;
//     }
  
//     const utilResponse = await handleImageUpload(selectedImage, setProductName, setError, setLoading);
//     setProductData(utilResponse);
  
//     const reader = new FileReader();
//     reader.onloadend = async () => {
//       const base64Image = reader.result.split(',')[1];
//       const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_VISION_API;
  
//       const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           requests: [{ image: { content: base64Image }, features: [{ type: 'WEB_DETECTION' }] }],
//         }),
//       });
  
//       const responseData = await response.json();
//       console.log('API Response:', responseData);
  
//       setAnalysisResults(responseData.responses[0].webDetection);
//       console.log('Image analyzed successfully!');
//     };
  
//     reader.readAsDataURL(selectedImage);
//   };