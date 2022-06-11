import { Component, OnInit } from '@angular/core';
import { dial, NSConn } from 'neffos.js';
import { io, protocol, Socket, connect } from 'socket.io-client';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'web-chat';

  private _connection: NSConn;
  async ngOnInit() {
    this.initializeWebsocket();

    // const w = new WebSocket('ws://localhost:8080/endpoint');
    // w.onopen = function () {
    //   console.log('Websocket connection enstablished');
    // };

    // w.onerror = console.error;
    // //  w.onclose = function () {
    // //    appendMessage('<div><center><h3>Disconnected</h3></center></div>');
    // //  };
    // w.onmessage = function (message) {
    //   console.log(message);
    // };

    // const s2 = io('http://localhost:8000/chat', {
    //   transports: ['websocket'],
    // });

    // s2.connect();

    // io.on('connection');

    // s2.open();

    // s2.onAny(console.log);
    // s2.on('msg', (data) => console.log(data));

    // s2.on('error', (err) => console.error(err));
    // s2.on('connect', () => console.log(s2.connected));
    // s2.on('reconnect', () => console.log('reconnedted'));
    // setInterval(() => {
    //   const e = s2.emit('msg', this.randomString());
    //   console.log(e);
    // }, 3000);
    // s2.on('');
  }

  private randomString = () => Math.random().toString().substr(2, 8);
  private id = this.randomString();

  socket: WebSocket;
  initializeWebsocket() {
    this.socket = new WebSocket('ws://localhost:9100/socket');
    this.socket.onmessage = (msg) => {
      console.log(msg);
    };

    setInterval(
      () => this.sendMessage(`yoo at ${Date.now().toString()} from ${this.id}`),
      2000
    );
  }

  sendMessage(message: string) {
    let msg = {
      greeting: message,
    };
    this.socket.send(JSON.stringify(msg));
  }
}
