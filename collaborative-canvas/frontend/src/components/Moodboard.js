import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Image } from "react-konva";
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL, {
    transports: ["websocket", "polling"],
    withCredentials: true,
  });

const Moodboard = ({ username, room }) => {
  const [images, setImages] = useState([]);
  const stageRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    socket.emit("joinRoom", { username, room });

    socket.on("loadImages", (roomImages) => setImages(roomImages));

    socket.on("newImage", (img) => {
      setImages((prev) => [...prev, img]);
    });

    socket.on("updateImage", (updatedImage) => {
      setImages((prev) =>
        prev.map((img) => (img.id === updatedImage.id ? updatedImage : img))
      );
    });

    return () => {
      socket.off("newImage");
      socket.off("updateImage");
      socket.off("loadImages");
      socket.disconnect();
    };
  }, [room, username]);

  const addImage = (imageUrl) => {
    if (!imageUrl) return alert("Please enter a valid image URL!");

    const newImage = {
      id: Date.now().toString(),
      url: imageUrl,
      x: Math.random() * 500,
      y: Math.random() * 300,
    };

    setImages((prev) => [...prev, newImage]);
    socket.emit("newImage", newImage);

    const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
  };

  return (
    <div>
      <h2>Moodboard: {room}</h2>
      <p>Welcome, {username}!</p>

      <button onClick={() => addImage(prompt("Enter image URL:"))}>
        Add Image
      </button>

      <Stage
      width={windowSize.width}
      height={windowSize.height}
      style={{ border: "1px solid black" }}
    >
      <Layer>
        {images.map((img) => (
          <KonvaImage key={img.id} imgData={img} />
        ))}
      </Layer>
    </Stage>
    </div>
  );
};

const KonvaImage = ({ imgData }) => {
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

  return image ? (
    <Image
      image={image}
      x={imgData.x}
      y={imgData.y}
      draggable
      onDragEnd={handleDragEnd}
    />
  ) : null;
};

export default Moodboard;
