import express from "express";
import { createServer } from "http";

import runSocketIO from "./socket";
import { GENERAL_CONFIG } from "./config";

const app = express();
app.get("/", (req, res) => {
  res.status(200).send("OK");
});

const server = createServer(app);
runSocketIO(server);

const { PORT } = GENERAL_CONFIG;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
