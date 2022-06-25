import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './room/room.component';
import { RoomSelectionComponent } from './room-selection/room-selection.component';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';
import { AuthProvider } from './interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './components/header/header.module';

@NgModule({
  declarations: [AppComponent, RoomComponent, RoomSelectionComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HeaderModule,
    AuthModule.forRoot({
      domain: 'dev-jajajfbc.us.auth0.com',
      clientId: 'Vsrw48jAFMbpXfIsLwAaHT8S6dlFVwOE',
      audience: 'https://dev-jajajfbc.us.auth0.com/api/v2/',
      apiUri: 'http://localhost:3000',
      appUri: 'http://localhost:4200',
      errorPath: '/error',
    }),
    BrowserAnimationsModule,
  ],
  providers: [AuthProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
