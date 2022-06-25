import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { io, Socket } from 'socket.io-client';
interface MessageReceivedEvent {
  id: string;
  message: string;
  date: Date;
}

interface UserEnterLeaveEvent {
  id: string;
  enter: boolean;
  date: Date;
}

type IRoomEventInfo =
  | {
      type: 'message';
      data: MessageReceivedEvent;
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
  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  form = this.fb.group({
    message: '',
  });

  socket: Socket;

  socketId: string;
  public messages: MessageReceivedEvent[] = [];
  public roomEvents: IRoomEventInfo[] = [];

  public addMessageReceivedEvent(e: MessageReceivedEvent) {
    this.roomEvents.push({
      type: 'message',
      data: e,
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
      this._resetMessages();
      this._connectToChatRoom(roomNumber);
    });
  }

  private _connectToChatRoom(roomNumber: string) {
    this.socket?.disconnect();
    this.socket = io(`http://localhost:3000/chat-${roomNumber}`, {
      auth: {},
    });

    this.socket.on('connect', () => {
      this.socketId = this.socket.id; // x8WIv7-mJelg7on_ALbx
    });

    this.socket.on('enter', ({ id, date }) => {
      console.log(id, ' entered the room !');
      this.addUserEnterLeaveEvent({ id, date, enter: true });
    });

    this.socket.on('exit', ({ id, date }) => {
      this.addUserEnterLeaveEvent({ id, date, enter: false });
    });

    this.socket.on('disconnect', () => {
      console.log(this.socket.id); // undefined
    });

    this.socket.on('message', (event: MessageReceivedEvent) =>
      this.addMessageReceivedEvent(event)
    );
  }

  _resetMessages() {
    this.messages = [];
  }

  sendMessage() {
    const msg = this.form.value.message;
    const s = this.socket.emit('message', msg);
    console.log(s);
    this.form.reset();
  }
}
