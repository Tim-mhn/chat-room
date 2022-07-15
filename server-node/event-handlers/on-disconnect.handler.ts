import { Namespace, Socket } from "socket.io";

export function onDisconnect(
  socket: Socket,
  chatNamespace: Namespace,
  roomName: string,
  username: string
) {
  return () => {
    chatNamespace
      .to(roomName)
      .emit("exit", { id: socket.id, date: new Date(), username });
  };
}
