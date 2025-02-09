import React, { useState } from "react";
import Moodboard from "./components/Moodboard";

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  const joinRoom = () => {
    if (username.trim() && room.trim()) {
      setJoined(true);
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
        <Moodboard username={username} room={room} />
      )}
    </div>
  );
}

export default App;
