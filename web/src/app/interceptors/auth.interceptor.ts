import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { AuthService, AuthState } from '@auth0/auth0-angular';
import { map, Observable, switchMap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _auth: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this._auth.getAccessTokenSilently().pipe(
      switchMap((accessToken) => {
        const authHeader = this._buildAuthorizationHeader(accessToken);
        const requestWithAuthHeaders = req.clone({
          headers: req.headers.set('Authorization', authHeader),
        });
        return next.handle(requestWithAuthHeaders);
      })
    );
  }

  private _buildAuthorizationHeader(accessToken: string) {
    return `Bearer ${accessToken}`;
  }
}

export const AuthProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
