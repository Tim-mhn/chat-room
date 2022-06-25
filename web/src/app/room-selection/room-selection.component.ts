import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-selection',
  templateUrl: './room-selection.component.html',
  styleUrls: ['./room-selection.component.scss'],
  host: {
    class: 'flex w-full flex-grow',
  },
})
export class RoomSelectionComponent implements OnInit {
  constructor() {}

  readonly rooms = [1, 2, 3];

  ngOnInit(): void {}
}
