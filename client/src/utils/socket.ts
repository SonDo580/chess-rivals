import { io } from "socket.io-client";

const serverURL =
  process.env.NODE_ENV === "production"
    ? "https://chess-server-ry8x.onrender.com"
    : "http://localhost:5000";

const socket = io(serverURL);

export { socket };
