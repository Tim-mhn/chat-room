import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { io, Socket } from 'socket.io-client';
import { uid } from 'uid';
import { ProfileService } from '../auth/profile.service';
import {
  MessageReadFromServerEvent,
  MessageReadToServerEvent,
} from '../events/message-read.event';
import { SendMessageEvent } from '../events/send-message.event';

interface MessageReceivedData {
  message: string;
  id: string;
}
interface MessageReceivedEvent {
  senderId: string;
  messageData: MessageReceivedData;
  date: Date;
  username: string;
}

type Message = MessageReceivedEvent & {
  readBy: string[];
};

interface UserEnterLeaveEvent {
  id: string;
  enter: boolean;
  date: Date;
  username: string;
}

type IRoomEventInfo =
  | {
      type: 'message';
      data: Message;
    }
  | {
      type: 'enterleave';
      data: UserEnterLeaveEvent;
    };
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  host: {
    class: 'flex flex-grow items-end',
  },
})
export class RoomComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  form = this.fb.group({
    message: '',
  });

  socket: Socket;

  socketId: string;

  showSenderIcon(msgEvent: any, i: number) {
    return (
      msgEvent.senderId !== this.socketId &&
      (!this.roomEvents[i + 1] ||
        this.roomEvents[i + 1]?.type !== 'message' ||
        msgEvent.senderId !== (this.roomEvents[i + 1]?.data as any).senderId)
    );
  }

  public roomEvents: IRoomEventInfo[] = [];

  public addMessageReceivedEvent(e: MessageReceivedEvent) {
    const messageWithNoReads = {
      ...e,
      readBy: [],
    };
    this.roomEvents.push({
      type: 'message',
      data: messageWithNoReads,
    });
  }

  public addUserEnterLeaveEvent(e: UserEnterLeaveEvent) {
    if (e.id === this.socketId) return;
    this.roomEvents.push({
      type: 'enterleave',
      data: e,
    });
  }
  async ngOnInit() {
    this.route.params.subscribe(({ roomNumber }) => {
      this._resetRoomEvents();
      this._connectToChatRoom(roomNumber);
    });
  }

  private _connectToChatRoom(roomNumber: string) {
    this.socket?.disconnect();
    this.socket = io(`http://localhost:3000/chat-${roomNumber}`, {
      auth: {},
      query: {
        username: this.profileService.profile?.username,
      },
    });

    this.socket.on('connect', () => {
      this.socketId = this.socket.id; // x8WIv7-mJelg7on_ALbx
    });

    this.socket.on('enter', ({ id, date, username }) => {
      console.log(id, ' entered the room !');
      this.addUserEnterLeaveEvent({ id, date, enter: true, username });
    });

    this.socket.on('exit', ({ id, date, username }) => {
      this.addUserEnterLeaveEvent({ id, date, enter: false, username });
    });

    this.socket.on('disconnect', () => {
      console.log(this.socket.id); // undefined
    });

    this.socket.on('message', (event: MessageReceivedEvent) => {
      this.addMessageReceivedEvent(event);
      this._emitMessageRead(event);
    });

    this.socket.on('readMessage', this._addReaderToMessage);
  }

  private _addReaderToMessage(ev: MessageReadFromServerEvent) {
    console.log(ev);
  }

  private _emitMessageRead(messageReceivedEvent: MessageReceivedEvent) {
    const event: MessageReadToServerEvent = {
      messageId: messageReceivedEvent.messageData.id,
      senderId: messageReceivedEvent.senderId,
    };

    this.socket.emit('readMessage', event);
  }

  private _resetRoomEvents() {
    this.roomEvents = [];
  }

  private get profileUsername() {
    return this.profileService.profile?.username as string;
  }

  sendMessage() {
    const msg = this.form.value.message;
    const messageId = uid();
    const event: SendMessageEvent = {
      message: msg,
      id: messageId,
    };
    const s = this.socket.emit('message', event);
    console.log(s);
    this.form.reset();
  }
}
