import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-selection',
  templateUrl: './room-selection.component.html',
  styleUrls: ['./room-selection.component.scss'],
})
export class RoomSelectionComponent implements OnInit {
  constructor() {}

  readonly rooms = [1, 2, 3];

  ngOnInit(): void {}
}
