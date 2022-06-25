import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { filter, map, Observable } from 'rxjs';

interface IDTokenClaims {
  raw: string;
  id: string;
  email: string;
  username: string;
  picture: string;
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private _auth0: AuthService) {}

  public login(): Observable<void> {
    return this._auth0.loginWithPopup();
  }

  public logout(): void {
    this._auth0.logout();
  }

  public get isLoggedIn$(): Observable<boolean> {
    return this._auth0.isAuthenticated$;
  }

  public get idTokenClaims$(): Observable<IDTokenClaims> {
    return this._auth0.idTokenClaims$.pipe(
      filter((claims) => !!claims),
      map((claims) => {
        return {
          raw: <string>claims?.__raw,
          id: '',
          email: <string>claims?.email,
          username: <string>claims?.nickname,
          picture: <string>claims?.picture,
          name: <string>claims?.name,
        };
      })
    );
  }

  public get accessToken$(): Observable<string> {
    return this._auth0.getAccessTokenSilently();
  }
}
