import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { io, Socket } from 'socket.io-client';
interface MessageReceivedEvent {
  id: string;
  message: string;
}
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  form = this.fb.group({
    message: '',
  });

  socket: Socket;

  socketId: string;
  public messages: MessageReceivedEvent[] = [];
  async ngOnInit() {
    this.route.params.subscribe(({ roomNumber }) => {
      this.socket?.disconnect();
      this.socket = io(`http://localhost:3000/chat-${roomNumber}`);

      this.socket.on('connect', () => {
        this.socketId = this.socket.id; // x8WIv7-mJelg7on_ALbx
      });

      this.socket.on('disconnect', () => {
        console.log(this.socket.id); // undefined
      });

      this.socket.on('message', (event: MessageReceivedEvent) =>
        this.messages.push(event)
      );

      this.socket.onAny((data) => console.log(data));
    });
  }

  sendMessage() {
    const msg = this.form.value.message;
    const s = this.socket.emit('message', msg);
    console.log(s);
    this.form.reset();
  }
}
