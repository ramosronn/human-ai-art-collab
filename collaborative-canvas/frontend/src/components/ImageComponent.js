import React, { useState, useEffect } from "react";
import { Image } from "react-konva";

const ImageComponent = ({socket, imgData }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = imgData.url;
    img.onload = () => setImage(img);
    img.onerror = () => console.error("Failed to load image:", imgData.url);
  }, [imgData.url]);

  const handleDragEnd = (e) => {
    const updatedImage = {
      ...imgData,
      x: e.target.x(),
      y: e.target.y(),
    };
    socket.emit("updateImage", updatedImage);
  };

  return image ? <Image image={image} x={imgData.x} y={imgData.y} draggable onDragEnd={handleDragEnd} /> : null;
};

export default ImageComponent;