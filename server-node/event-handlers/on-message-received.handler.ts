import { Namespace, Socket } from "socket.io";

export function onMessageReceived(
  socket: Socket,
  chatNamespace: Namespace,
  roomName: string,
  username: string
) {
  const socketId = socket.id;
  return (messageData: { message: string; id: string }) => {
    chatNamespace.to(roomName).emit("message", {
      senderId: socketId,
      messageData,
      date: new Date(),
      username,
    });
  };
}
