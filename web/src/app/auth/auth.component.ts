import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private auth: AuthService, private http: HttpClient) {}

  isAuthenticated$ = this.auth.isAuthenticated$;
  ngOnInit(): void {}

  login() {
    this.auth.loginWithPopup();
  }
  logout() {
    this.auth.logout();
  }

  callAPI() {
    this.http.get('http://localhost:3000/api/private').subscribe(console.log);
  }

  callPublicAPI() {
    this.http.get('http://localhost:3000/api/public').subscribe(console.log);
  }
}
