import React from "react";

const ImageUploader = ({ onUpload }) => {
  const handleUpload = async (e) => {
    const input = e.target;
    const file = input.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async function (event) {
        const base64Data = event.target.result.split(",")[1];
        onUpload(base64Data);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        id="fileInput"
        onChange={handleUpload}
        style={{ display: "none" }}
      />
      <button onClick={handleButtonClick}>Upload Image</button>
    </div>
  );
};

export default ImageUploader;
