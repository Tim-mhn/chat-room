import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { Profile } from '../models/profile';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private auth: AuthenticationService) {}

  public readonly profile$: Observable<Profile | null> =
    this.auth.idTokenClaims$.pipe(
      map((idTokenClaims) => {
        const { name, username, email, picture, id } = idTokenClaims;

        return {
          name,
          email,
          picture,
          username,
          id,
        };
      }),
      catchError(() => of(null)),
      tap(console.log),
      tap((p) => (this._profile = p)),
      shareReplay(1)
    );

  private _profile: Profile | null;
  public get profile() {
    return this._profile;
  }
}
