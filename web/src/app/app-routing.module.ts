import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomSelectionComponent } from './room-selection/room-selection.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  {
    path: 'room/:roomNumber',
    component: RoomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
