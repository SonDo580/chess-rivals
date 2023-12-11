import { Server as HttpServer } from "http";
import { Server } from "socket.io";

import {
  createRoomHandler,
  disconnectHandler,
  joinRoomHandler,
  leaveRoomHandler,
} from "./controllers/room";
import { promotionHandler, selectSquareHandler } from "./controllers/game";
import {
  acceptResetHandler,
  rejectResetHandler,
  resetRequestHandler,
} from "./controllers/reset";

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
    socket.on("leaveRoom", leaveRoomHandler(socket, io));
    socket.on("disconnect", disconnectHandler(socket, io));

    socket.on("selectSquare", selectSquareHandler(socket, io));
    socket.on("promote", promotionHandler(socket, io));

    socket.on("resetRequest", resetRequestHandler(socket, io));
    socket.on("acceptReset", acceptResetHandler(socket, io));
    socket.on("rejectReset", rejectResetHandler(socket, io));
  });
};

export default runSocketIO;
