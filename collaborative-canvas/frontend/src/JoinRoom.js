import React, { useState } from "react";
import { FaUser, FaDoorOpen } from "react-icons/fa";
import "./JoinRoom.css"; // Import the CSS file

const JoinRoom = ({ onJoin }) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !room) {
      setError("Username and room name are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate an API call to join the room
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onJoin({ username, room });
    } catch (err) {
      setError("Failed to join the room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="join-room-container">
      <h1>Join a Room</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FaDoorOpen className="icon" />
          <input
            type="text"
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Joining..." : "Join Room"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default JoinRoom;