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

  io.on(ClientEventName.Connection, (socket) => {
    socket.on(ClientEventName.CreateRoom, createRoomHandler(socket));
    socket.on(ClientEventName.JoinRoom, joinRoomHandler(socket, io));
    socket.on(ClientEventName.LeaveRoom, leaveRoomHandler(socket, io));
    socket.on(ClientEventName.Disconnect, disconnectHandler(socket, io));

    socket.on(ClientEventName.SelectSquare, selectSquareHandler(socket, io));
    socket.on(ClientEventName.Promote, promotionHandler(socket, io));

    socket.on(ClientEventName.ResetRequest, resetRequestHandler(socket, io));
    socket.on(ClientEventName.AcceptReset, acceptResetHandler(socket, io));
    socket.on(ClientEventName.RejectReset, rejectResetHandler(socket, io));
  });
};

export default runSocketIO;
