import * as express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const chatNsp = io.of("/chat");

chatNsp.on("connection", (socket) => {
  console.log("connection !");
  console.log(socket.id);
  const socketId = socket.id;
  socket.on("message", (msg) => {
    console.log("received message ", msg);
    chatNsp.emit("message", { id: socketId, message: msg });
  });
});

// setInterval(() => io.emit("msg", "hello"), 3000);

httpServer.listen(3000, () => {
  console.log("Listening on http://localhost:3000 .....");
});
