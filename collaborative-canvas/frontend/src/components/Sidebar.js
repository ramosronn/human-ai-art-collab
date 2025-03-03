import React, { useState} from "react";

const Sidebar = ({ socket, boardId, users, roomName, username, setImages }) => {
    const [imageUrl, setImageUrl] = useState("");
  
    const addImage = () => {
      if (!imageUrl.trim()) return alert("Please enter a valid image URL!");
  
      const newImage = {
        boardId: boardId,
        id: Date.now().toString(),
        url: imageUrl,
        x: Math.random() * window.innerWidth * 0.7,
        y: Math.random() * window.innerHeight * 0.7,
      };
  
      setImages((prev) => [...prev, newImage]);
      socket.emit("newImage", newImage);
      setImageUrl(""); // Clear input field
    };
  
    return (
      <div style={{ width: "30%", height: "100%", backgroundColor: "#f0f0f0", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2>{roomName} Room</h2>
        <p>Welcome, {username}!</p>
  
        <h3>Add Image</h3>
        <input
          type="text"
          placeholder="Paste image URL"
          style={{ width: "100%", marginBottom: "10px" }}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") addImage(); }}
        />
        <button onClick={addImage} style={{ padding: "10px", width: "100%" }}>Add Image</button>
        <div>
          <h3>Users in Room:</h3>
          <ul>
            {users.map((user) => (<li key={user.id}>{user.username}</li>))}
          </ul>
        </div>
      </div>
    );
  };

  export default Sidebar;