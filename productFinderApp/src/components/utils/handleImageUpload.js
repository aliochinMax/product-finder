import axios from "axios";
import heic2any from "heic2any";

export const handleImageUpload = async (imageFile) => {
  try {
    let convertedImage;

    // Check if the file type is SVG, PNG, or already in JPEG format
    if (
      imageFile.type.startsWith("image/svg+xml") ||
      imageFile.type.startsWith("image/png") ||
      imageFile.type.startsWith("image/jpeg")
    ) {
      // No conversion needed for SVG, PNG, or JPEG files
      convertedImage = imageFile;
    } else {
      // Convert to JPEG using heic2any for other formats
      convertedImage = await heic2any({ blob: imageFile });
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const imageContent = reader.result.split(",")[1];

      // set the endpoint for the google vision api
      const visionApiEndpoint =
        "https://vision.googleapis.com/v1/images:annotate";
      const apiKey = process.env.REACT_APP_GOOGLE_VISION_API;

      try {
        const visionApiResponse = await axios.post(
          `${visionApiEndpoint}?key=${apiKey}`,
          {
            requests: [
              {
                image: {
                  content: imageContent,
                },
                features: [
                  {
                    type: "PRODUCT_SEARCH",
                    maxResults: 10,
                  },
                  {
                    type: "LABEL_DETECTION",
                    maxResults: 5,
                  },
                  {
                    type: "LOGO_DETECTION",
                    maxResults: 5,
                  },
                  {
                    type: "TEXT_DETECTION",
                    maxResults: 5,
                  },
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

        return visionApiResponse;
      } catch (error) {
        console.error("Error processing image:", error);
        throw error;
      }
    };

    reader.readAsDataURL(convertedImage);
  } catch (error) {
    console.error("Error reading image:", error);
    throw error;
  }
};