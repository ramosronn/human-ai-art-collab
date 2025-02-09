import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Image } from "react-konva";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Moodboard = ({ username, room }) => {
  const [images, setImages] = useState([]);
  const stageRef = useRef(null);

  useEffect(() => {
    socket.emit("joinRoom", { username, room });

    socket.on("loadImages", (roomImages) => {
      setImages(roomImages);
    });

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
    };
    }, [room, username]);


  const addImage = (imageUrl) => {
    const newImage = {
      id: Date.now(),
      url: imageUrl,
      x: Math.random() * 500,
      y: Math.random() * 300,
    };

    setImages((prev) => [...prev, newImage]);
    socket.emit("newImage", newImage);
  };

  return (
    <div>
      <h2>Moodboard: {room}</h2>
      <p>Welcome, {username}!</p>
      <input
        type="text"
        placeholder="Paste image URL"
        onKeyDown={(e) => {
          if (e.key === "Enter") addImage(e.target.value);
        }}
      />
      <button onClick={() => addImage(prompt("Enter image URL:"))}>
        Add Image
      </button>

      <Stage width={800} height={500} ref={stageRef} style={{ border: "1px solid black" }}>
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
