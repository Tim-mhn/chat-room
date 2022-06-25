import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginModule } from './components/login/login.module';
import { LoggedInGuard } from './logged-in.guard';
import { RoomSelectionComponent } from './room-selection/room-selection.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'rooms',
    component: RoomSelectionComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        path: ':roomNumber',
        component: RoomComponent,
      },
    ],
  },
  // {
  //   path: 'room/:roomNumber',
  //   component: RoomComponent,
  //   canActivate: [LoggedInGuard],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LoginModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
