import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './room/room.component';
import { RoomSelectionComponent } from './room-selection/room-selection.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    RoomSelectionComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-jajajfbc.us.auth0.com',
      clientId: 'Vsrw48jAFMbpXfIsLwAaHT8S6dlFVwOE',
      audience: 'https://dev-jajajfbc.us.auth0.com/api/v2/',
      apiUri: 'http://localhost:3000',
      appUri: 'http://localhost:4200',
      errorPath: '/error',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
