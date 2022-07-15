export interface MessageReadToServerEvent {
  messageId: string;
  senderId: string;
}

export interface MessageReadFromServerEvent {
  messageId: string;
  readBy: string;
}
