import express from "express";
import { createServer } from "http";

import runSocketIO from "./socket";
import { GENERAL_CONFIG } from "./config";

const app = express();
const server = createServer(app);
runSocketIO(server);

const { PORT } = GENERAL_CONFIG;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
