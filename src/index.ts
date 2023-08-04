import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Socket } from "socket.io";

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors({ origin: process.env.SOCKET_CLIENT_ORIGIN }));

// Socket connection
let http = require("http").Server(app);

//  Configure routes
import SocketController from "./controllers/socket";
import message from "./routes/message";
import rooms from "./routes/rooms";
app.use("/api/v1/", message);
app.use("/api/v1/", rooms);

// Default routes
app.get("/", function (req, res) {
  res.send({ message: "Application working success" });
});
http.listen(port, function () {
  console.log(`⚡[Server]: listening at http://localhost:${port}`);
});

// Socket Server implementation
let io = require("socket.io")(http, {
  cors: { origin: process.env.SOCKET_CLIENT_ORIGIN },
});
io.on("connection", async (socket: Socket) => {
  console.log("socket connected");
  SocketController(socket, io);
});
