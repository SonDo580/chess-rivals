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
import { GENERAL_CONFIG } from "./config";
import { ClientEventName } from "./constants/event";

const runSocketIO = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: GENERAL_CONFIG.CLIENT_URL },
  });

  io.on(ClientEventName.CONNECTION, (socket) => {
    socket.on(ClientEventName.CREATE_ROOM, createRoomHandler(socket));
    socket.on(ClientEventName.JOIN_ROOM, joinRoomHandler(socket, io));
    socket.on(ClientEventName.LEAVE_ROOM, leaveRoomHandler(socket, io));
    socket.on(ClientEventName.DISCONNECT, disconnectHandler(socket, io));

    socket.on(ClientEventName.SELECT_SQUARE, selectSquareHandler(socket, io));
    socket.on(ClientEventName.PROMOTE, promotionHandler(socket, io));

    socket.on(ClientEventName.RESET_REQUEST, resetRequestHandler(socket, io));
    socket.on(ClientEventName.ACCEPT_RESET, acceptResetHandler(socket, io));
    socket.on(ClientEventName.REJECT_RESET, rejectResetHandler(socket, io));
  });
};

export default runSocketIO;
