import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { dial, NSConn } from 'neffos.js';
import { io, protocol, Socket, connect } from 'socket.io-client';

interface MessageReceivedEvent {
  id: string;
  message: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'web-chat';

  private _connection: NSConn;

  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    message: '',
  });

  socket: Socket;

  socketId: string;
  public messages: MessageReceivedEvent[] = [];
  async ngOnInit() {
    this.socket = io('http://localhost:3000/chat');

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
  }

  sendMessage() {
    const msg = this.form.value.message;
    const s = this.socket.emit('message', msg);
    console.log(s);
    this.form.reset();
  }
}
