import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to backend

const Canvas = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      selection: true, // Enable object selection
    });

    setCanvas(fabricCanvas);

    // Receive updates when another user moves an object
    socket.on("updateObject", (data) => {
      fabricCanvas.getObjects().forEach((obj) => {
        if (obj.id === data.id) {
          obj.set({ left: data.left, top: data.top });
          fabricCanvas.renderAll();
        }
      });
    });

    return () => {
      socket.off("updateObject");
      fabricCanvas.dispose();
    };
  }, []);

  // Handle adding an image
  const addImage = (url) => {
    if (!canvas) return;

    fabric.Image.fromURL(url, (img) => {
      img.set({
        left: 100,
        top: 100,
        id: Date.now().toString(),
        hasControls: true,
        selectable: true,
      });

      canvas.add(img);
      canvas.renderAll();
    });
  };

  // Emit object movement
  useEffect(() => {
    if (!canvas) return;

    canvas.on("object:moving", (e) => {
      const obj = e.target;
      socket.emit("updateObject", { id: obj.id, left: obj.left, top: obj.top });
    });
  }, [canvas]);

  return (
    <div>
      <h2>Collaborative Moodboard</h2>
      <input
        type="text"
        placeholder="Paste image URL"
        onKeyDown={(e) => {
          if (e.key === "Enter") addImage(e.target.value);
        }}
      />
      <canvas ref={canvasRef} width={800} height={500} style={{ border: "1px solid black" }} />
    </div>
  );
};

export default Canvas;
