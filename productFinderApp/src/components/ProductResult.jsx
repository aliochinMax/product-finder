import React, { useState } from "react";
import axios from "axios";
import DragNDrop from "./DragNDrop";
import ProductGrid from "./ProductGrid";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import heic2any from "heic2any";
import { imageFileResizer } from "react-image-file-resizer";

const RealTimeProductSearch = () => {
  const [productName, setProductName] = useState("");
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const modifyData = (products) => {
    return productData.data.map((product) => {
      // Check if product.offer.shipping exists
      const shippingValue = product.offer.shipping ? product.offer.shipping : 0;
      const imagesValue = Array.isArray(product.product_photos) ? product.product_photos : [product.product_photos];


      return {
        name: product.product_title,
        description: product.product_description,
        retailer: product.offer.store_name,
        rating: product.offer.store_rating,
        price: product.offer.price.replace(/£/g, ''),
        shipping: shippingValue,
        link: product.offer.offer_page_url,
        images: imagesValue,
      };
    });
  };

  //check if item is being dragged
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.IMAGE,
    item: { type: ItemTypes.IMAGE, imageFile },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  //action taken when item is dropped
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.IMAGE,
    drop: async (item) => {
      try {
        let jpegImage;

        // Check if the dropped file is not in JPEG format
        if (
          imageFile.type.startsWith("image/jpeg") ||
          imageFile.type.startsWith("image/svg+xml") ||
          imageFile.type.startsWith("image/png")
        ) {
          jpegImage = await heic2any({ blob: imageFile });
        } else {
          // If the image is already in JPEG format, use it directly
          jpegImage = imageFile;
        }
        // Resize the image if needed
        const resizedImage = await new Promise((resolve) => {
          imageFileResizer(
            jpegImage,
            640,
            640,
            "JPEG",
            100,
            0,
            (uri) => resolve(uri),
            "base64"
          );
        });

        setImageFile(resizedImage);
      } catch (error) {
        setError(error);
        console.error("Error processing image:", error);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const extractItemNameFromResponse = (response) => {
    // Check if response is valid and has fullTextAnnotations
    if (response?.data?.responses?.[0]?.fullTextAnnotation) {
      const extractedText = response.data.responses[0].fullTextAnnotation.text;
      setProductName(extractedText);

      return extractedText;
    }
    //if item is not recognized
    return "Unknown Item";
  };

//handle the image that has been uploaded
// handle the image that has been uploaded
const handleImageUpload = async (imageFile) => {
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
      const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_VISION_API;

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

        // retrieve the name of the product from the Google API
        console.log('Google Vision API Response:', visionApiResponse);

        const itemName = extractItemNameFromResponse(visionApiResponse);
        setProductName(itemName);
        fetchData(itemName);
      } catch (error) {
        setError(error);
        console.error("Error processing image:", error);
      }
    };

    reader.readAsDataURL(convertedImage);
  } catch (error) {
    setError(error);
    console.error("Error reading image:", error);
  }
};


  //fetch data from real-time-data api
  const fetchData = async (itemName) => {
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
      setProductData(response.data);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}>
        {/* Display the image in the drag-and-drop area */}
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Dragged Image"
            style={{ width: "100%", height: "auto" }}
          />
        )}
        <DragNDrop
          text={productName}
          dragType={ItemTypes.IMAGE}
          onDrop={handleImageUpload}
        />
      </div>

      <div ref={drop}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {Array.isArray(productData?.data) && productData.data.length > 0 && (
          <div>
            {console.log(productData)}
            <ProductGrid products={modifyData(productData)} />
          </div>
        )}
      </div>
    </>
  );
};

export default RealTimeProductSearch;
