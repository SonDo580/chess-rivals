import { Server as HttpServer } from "http";
import { Server } from "socket.io";

import { RoomController } from "./controllers/room.controller";
import { GameController } from "./controllers/game.controller";
import { ResetController } from "./controllers/reset.controller";
import { GENERAL_CONFIG } from "./config";
import { ClientEventName } from "./constants/event";

const runSocketIO = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: GENERAL_CONFIG.CLIENT_URL },
  });

  io.on(ClientEventName.CONNECTION, (socket) => {
    const roomController = new RoomController(socket, io);
    const gameController = new GameController(socket, io);
    const resetController = new ResetController(socket, io);

    // Room management
    socket.on(ClientEventName.CREATE_ROOM, roomController.createRoomHandler);
    socket.on(ClientEventName.JOIN_ROOM, roomController.joinRoomHandler);
    socket.on(ClientEventName.LEAVE_ROOM, roomController.leaveRoomHandler);
    socket.on(ClientEventName.DISCONNECT, roomController.disconnectHandler);

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
