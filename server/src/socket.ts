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
    socket.on(
      ClientEventName.CREATE_ROOM,
      roomController.createRoomHandler.bind(roomController),
    );
    socket.on(
      ClientEventName.JOIN_ROOM,
      roomController.joinRoomHandler.bind(roomController),
    );
    socket.on(
      ClientEventName.LEAVE_ROOM,
      roomController.leaveRoomHandler.bind(roomController),
    );
    socket.on(
      ClientEventName.DISCONNECT,
      roomController.disconnectHandler.bind(roomController),
    );

    // Main game flow
    socket.on(
      ClientEventName.SELECT_SQUARE,
      gameController.selectSquareHandler.bind(gameController),
    );
    socket.on(
      ClientEventName.PROMOTE,
      gameController.promotionHandler.bind(gameController),
    );

    // Reset handling
    socket.on(
      ClientEventName.RESET_REQUEST,
      resetController.resetRequestHandler.bind(resetController),
    );
    socket.on(
      ClientEventName.ACCEPT_RESET,
      resetController.acceptResetHandler.bind(resetController),
    );
    socket.on(
      ClientEventName.REJECT_RESET,
      resetController.rejectResetHandler.bind(resetController),
    );
  });
};

export default runSocketIO;
