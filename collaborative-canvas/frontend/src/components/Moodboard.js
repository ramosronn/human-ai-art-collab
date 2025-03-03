import React, { useState, useRef } from "react";
import { Stage, Layer } from "react-konva";
import ImageComponent from "./ImageComponent";
import Sidebar from "./Sidebar";
import useBoardSocket from "../hook/useBoardSocket";
import useWindowSize from "../hook/useWindowSize";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Moodboard = ({ username, roomData }) => {
  const boards = roomData.boards;
  console.log(roomData)
  const [board, setBoard] = useState(boards[boards.length - 1]);
  const [images, setImages] = useState(board.images);
  const [users, setUsers] = useState([]);
  const stageRef = useRef(null);
  const windowSize = useWindowSize();

  useBoardSocket(socket, username, roomData._id, board, setUsers, setImages);

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <Sidebar username={username} boardId={board._id} users={users} roomName={roomData.name} setImages={setImages} socket={socket} />
      <div style={{ width: "100%", height: "100%" }}>
        <Stage width={windowSize.width * 0.7} height={windowSize.height} ref={stageRef}>
          <Layer>{images.map((img) => <ImageComponent key={img.id} imgData={img} socket={socket}/>)}</Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Moodboard;
