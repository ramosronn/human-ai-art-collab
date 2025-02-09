import React, { useState } from "react";
import Moodboard from "./components/Moodboard";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL; 

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  const joinRoom = async () => {
    if (username.trim() && room.trim()) {
      try {
        // Check if the room exists or create it on the backend
        const response = await fetch(`${BACKEND_URL}/join-room`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, room }),
        });

        if (response.ok) {
          setJoined(true);
        } else {
          alert("Failed to join room. Please try again.");
        }
      } catch (error) {
        console.error("Error joining room:", error);
        alert("Error connecting to the server.");
      }
    } else {
      alert("Please enter a username and room name.");
    }
  };

  return (
    <div>
      {!joined ? (
        <div>
          <h1>Join a Moodboard Session</h1>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter moodboard room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join</button>
        </div>
      ) : (
        <Moodboard username={username} room={room} backendUrl={BACKEND_URL} />
      )}
    </div>
  );
}

export default App;
