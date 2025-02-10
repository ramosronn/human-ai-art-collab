import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Image } from "react-konva";
import { io } from "socket.io-client";

const socket = io("https://human-ai-art-collab-dev.onrender.com/");

const Moodboard = ({ username, room }) => {
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const stageRef = useRef(null);

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

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const addImage = (url) => {
    if (!url.trim()) return alert("Please enter a valid image URL!");

    const newImage = {
      id: Date.now().toString(),
      url,
      x: Math.random() * windowSize.width * 0.7,
      y: Math.random() * windowSize.height * 0.7,
    };

    setImages((prev) => [...prev, newImage]);
    socket.emit("newImage", newImage);
    setImageUrl(""); // Clear input field
  };

  const handleSubmit = () => {
    addImage(imageUrl);
  };

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      {/* Sidebar for Controls */}
      <div
        style={{
          width: "30%",
          height: "100%",
          backgroundColor: "#f0f0f0",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Moodboard: {room}</h2>
        <p>Welcome, {username}!</p>

        <h3>Add Image</h3>
        <input
          type="text"
          placeholder="Paste image URL"
          style={{ width: "100%", marginBottom: "10px" }}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />
        <button
          onClick={handleSubmit}
          style={{ padding: "10px", width: "100%" }}
        >
          Add Image
        </button>
      </div>

      {/* Moodboard Canvas (70%) */}
      <div style={{ width: "70%", height: "100%" }}>
        <Stage width={windowSize.width * 0.7} height={windowSize.height} ref={stageRef}>
          <Layer>
            {images.map((img) => (
              <KonvaImage key={img.id} imgData={img} />
            ))}
          </Layer>
        </Stage>
      </div>
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
