import { Namespace, Socket } from "socket.io";
import { onDisconnect } from "./on-disconnect.handler";
import { onMessageReceived } from "./on-message-received.handler";

export function onConnection(chatNamespace: Namespace) {
  return (socket: Socket) => {
    const nsp = socket.nsp;
    const username = socket.handshake.query["username"] as string;
    const roomNumber = nsp.name.slice(-1);
    const roomName = `room-${roomNumber}`;
    const socketId = socket.id;
    socket.join(roomName);

    chatNamespace
      .to(roomName)
      .emit("enter", { id: socketId, date: new Date(), username });
    socket.on(
      "message",
      onMessageReceived(socket, chatNamespace, roomName, username)
    );
    socket.on(
      "disconnect",
      onDisconnect(socket, chatNamespace, roomName, username)
    );

    socket.on("readMessage", ({ messageId, senderId }) =>
      socket.broadcast
        .to(senderId)
        .emit("readMessage", { messageId, readBy: username })
    );
  };
}
