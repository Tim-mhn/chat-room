import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    class: 'flex-grow justify-center items-center',
  },
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {}

  login() {
    this.auth.login();
  }
}
