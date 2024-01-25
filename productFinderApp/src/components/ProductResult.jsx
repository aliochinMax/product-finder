import React, { useState } from "react";
import axios from "axios";
import DragNDrop from "./DragNDrop";
import ProductGrid from "./ProductGrid";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import heic2any from "heic2any";
import { imageFileResizer } from "react-image-file-resizer";
import ProductCarousel from "./ProductCarousel";
import {
  handleImageUpload,
  extractItemNameFromResponse,
  fetchData,
} from "./utils/ImageHandlingAndApiCall"

const RealTimeProductSearch = () => {
  const [productName, setProductName] = useState("");
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Function to modify product data
  const modifyData = (products) => {
    return products.map((product) => {
      const shippingValue = product.offer.shipping ? product.offer.shipping : 0;
      const imagesValue = Array.isArray(product.product_photos)
        ? product.product_photos
        : [product.product_photos];

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
  const handleImageUploadWrapper = async (imageFile) => {
    const utilResponse = await handleImageUpload(imageFile, setProductName, setError, setLoading, fetchData);
    const parsedResponse = JSON.parse(utilResponse);
    console.log(`Util Response ${utilResponse}`)
    console.log(`Parsed Response ${parsedResponse.data[0].product_id}`)
   
    setProductData(modifyData(parsedResponse.data))
  };

  // Function to handle image drop
  const handleImageDrop = async (item) => {
    try {
      let jpegImage;
  
      if (
        item.imageFile.type.startsWith("image/jpeg") ||
        item.imageFile.type.startsWith("image/svg+xml") ||
        item.imageFile.type.startsWith("image/png")
      ) {
        jpegImage = await heic2any({ blob: item.imageFile });
      } else {
        jpegImage = item.imageFile;
      }
  
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
  
      // Pass the updated imageFile to the handleImageUploadWrapper function
      handleImageUploadWrapper(resizedImage);
    } catch (error) {
      setError(error);
      console.error("Error processing image:", error);
    }
  };

  // Drag and drop hooks
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.IMAGE,
    item: { type: ItemTypes.IMAGE, imageFile },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.IMAGE,
    drop: {handleImageDrop},
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <>
      <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}>
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
          onDrop={handleImageUploadWrapper}
        />
      </div>
  
      <div ref={drop}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {productData && Array.isArray(productData) && productData.length > 0 && (
          <div>
            <ProductCarousel products={productData} />
            <ProductGrid products={productData} />
          </div>
        )}
      </div>
    </>
  );
};

export default RealTimeProductSearch;
