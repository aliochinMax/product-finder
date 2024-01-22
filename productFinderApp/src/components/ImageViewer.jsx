import React from "react";

const ImageViewer = ({ imageUrl }) => {
    return (
        <div>
            <img src={ imageUrl } alt="Uploaded Image" style={{display: 'block', maxWidth: '100%'}} />
        </div>
    );
};

export default ImageViewer