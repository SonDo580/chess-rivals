import { Server as HttpServer } from "http";
import { Server } from "socket.io";

import {
  createRoomHandler,
  disconnectHandler,
  joinRoomHandler,
  leaveRoomHandler,
} from "./controllers/room";
import { GameController } from "./controllers/game.controller";
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
    const gameController = new GameController(socket, io);

    socket.on(ClientEventName.CREATE_ROOM, createRoomHandler(socket));
    socket.on(ClientEventName.JOIN_ROOM, joinRoomHandler(socket, io));
    socket.on(ClientEventName.LEAVE_ROOM, leaveRoomHandler(socket, io));
    socket.on(ClientEventName.DISCONNECT, disconnectHandler(socket, io));

    socket.on(
      ClientEventName.SELECT_SQUARE,
      gameController.selectSquareHandler
    );
    socket.on(ClientEventName.PROMOTE, gameController.promotionHandler);

    socket.on(ClientEventName.RESET_REQUEST, resetRequestHandler(socket, io));
    socket.on(ClientEventName.ACCEPT_RESET, acceptResetHandler(socket, io));
    socket.on(ClientEventName.REJECT_RESET, rejectResetHandler(socket, io));
  });
};

export default runSocketIO;
