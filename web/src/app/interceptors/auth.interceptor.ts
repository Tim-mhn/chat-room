import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { AuthenticationService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _auth: AuthenticationService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return forkJoin([this._auth.accessToken$, this._auth.idTokenClaims$]).pipe(
      switchMap(([accessToken, idTokenClaims]) => {
        const authHeader = this._buildAuthorizationHeader(accessToken);
        const idToken = idTokenClaims?.raw as string;
        const requestWithAuthHeaders = req.clone({
          headers: req.headers
            .set('Authorization', authHeader)
            .set('idToken', idToken),
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
