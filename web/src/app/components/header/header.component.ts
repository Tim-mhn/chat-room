import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/auth.service';
import { ProfileService } from '../../auth/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    class: 'w-full',
  },
})
export class HeaderComponent implements OnInit {
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    public profileService: ProfileService
  ) {}

  isLoggedIn$ = this.auth.isLoggedIn$;
  ngOnInit(): void {}

  login() {
    this.auth.login().subscribe(() => this.router.navigate(['/rooms']));
  }

  logout() {
    this.auth.logout();
  }
}
