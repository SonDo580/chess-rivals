import { Server as HttpServer } from "http";
import { Server } from "socket.io";

import { createRoomHandler, joinRoomHandler } from "./controllers/room";

const runSocketIO = (httpServer: HttpServer) => {
  const allowedOrigins = [
    "https://sondm-chess.netlify.app",
    "http://localhost:5173",
  ];

  const io = new Server(httpServer, {
    cors: { origin: allowedOrigins },
  });

  io.on("connection", (socket) => {
    socket.on("createRoom", createRoomHandler(socket));
    socket.on("joinRoom", joinRoomHandler(socket, io));
  });
};

export default runSocketIO;
