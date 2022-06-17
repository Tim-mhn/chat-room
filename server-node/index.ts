import * as express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const chatNsp = io.of(/^\/chat-\d$/);

chatNsp.on("connection", (socket: Socket) => {
  const nsp = socket.nsp;

  const roomNumber = nsp.name.slice(-1);
  const roomName = `room-${roomNumber}`;
  const socketId = socket.id;
  socket.join(roomName);

  chatNsp.to(roomName).emit("enter", { id: socketId, date: new Date() });
  socket.on("message", (msg) => {
    console.log("received message ", msg);
    chatNsp
      .to(roomName)
      .emit("message", { id: socketId, message: msg, date: new Date() });
  });

  socket.on("disconnect", () => {
    console.log(socketId, " disconnected");
    chatNsp.to(roomName).emit("exit", { id: socketId, date: new Date() });
  });
});

// setInterval(() => io.emit("msg", "hello"), 3000);

httpServer.listen(3000, () => {
  console.log("Listening on http://localhost:3000 .....");
});
