import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
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
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    public profileService: ProfileService
  ) {}

  isLoggedIn$ = this.auth.isLoggedIn$;

  private navigateToRoomsOnLoginSub: Subscription;
  ngOnInit(): void {
    this.navigateToRoomsOnLoginSub = this.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        if (isLoggedIn) this.router.navigate(['/rooms']);
      }
    );
  }

  login() {
    this.auth.login().subscribe();
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.navigateToRoomsOnLoginSub?.unsubscribe();
  }
}
