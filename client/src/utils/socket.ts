import { io } from "socket.io-client";

const serverURL =
  process.env.NODE_ENV === "production"
    ? "<server URL>"
    : "http://localhost:5000";

const socket = io(serverURL);

export { socket };
