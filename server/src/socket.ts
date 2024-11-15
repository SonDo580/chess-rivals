import { Server as HttpServer } from "http";
import { Server } from "socket.io";

import {
  createRoomHandler,
  disconnectHandler,
  joinRoomHandler,
  leaveRoomHandler,
} from "./controllers/room";
import { GameController } from "./controllers/game.controller";
import { ResetController } from "./controllers/reset.controller";
import { GENERAL_CONFIG } from "./config";
import { ClientEventName } from "./constants/event";

const runSocketIO = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: GENERAL_CONFIG.CLIENT_URL },
  });

  io.on(ClientEventName.CONNECTION, (socket) => {
    const gameController = new GameController(socket, io);
    const resetController = new ResetController(socket, io);

    // Room management
    socket.on(ClientEventName.CREATE_ROOM, createRoomHandler(socket));
    socket.on(ClientEventName.JOIN_ROOM, joinRoomHandler(socket, io));
    socket.on(ClientEventName.LEAVE_ROOM, leaveRoomHandler(socket, io));
    socket.on(ClientEventName.DISCONNECT, disconnectHandler(socket, io));

    // Main game flow
    socket.on(
      ClientEventName.SELECT_SQUARE,
      gameController.selectSquareHandler
    );
    socket.on(ClientEventName.PROMOTE, gameController.promotionHandler);

    // Reset handling
    socket.on(
      ClientEventName.RESET_REQUEST,
      resetController.resetRequestHandler
    );
    socket.on(ClientEventName.ACCEPT_RESET, resetController.acceptResetHandler);
    socket.on(ClientEventName.REJECT_RESET, resetController.rejectResetHandler);
  });
};

export default runSocketIO;
