import express from "express";
import { createServer } from "http";
import runSocketIO from "./socket";

const app = express();
const server = createServer(app);
runSocketIO(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
