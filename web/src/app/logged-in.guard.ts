import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from './auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(private _auth: AuthenticationService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('logged in guard');
    const isLoggedIn$ = this._auth.isLoggedIn$;
    return isLoggedIn$.pipe(
      map((isLoggedIn) => {
        console.log('is logged in ? ', isLoggedIn);
        return isLoggedIn || this.router.createUrlTree(['/login']);
      })
    );
  }
}
