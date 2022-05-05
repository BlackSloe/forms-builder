import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from '../../_services/authentication.service';
import { User } from 'src/app/_models/user';
import {
  loadUser,
  loadUserFailed,
  loadUserSuccessfully,
  loginAction, loginFailedAction, loginSuccessAction, logoutAction, signUpAction, signUpSuccessAction
} from '../actions/user.actions';

@Injectable({ providedIn: 'root' })
export class AuthenticationEffects {
  constructor(
    private actions: Actions,
    private authService: AuthenticationService
  ) { }

  login$ = createEffect(() => {
    return this.actions.pipe(
      ofType(loginAction),
      switchMap((payLoad) => {
        return this.authService.login(payLoad.userName, payLoad.password)
          .pipe(
            map((user: User) => {
              console.log(user);
              if (user) {
                return loginSuccessAction({ user });
              }
              return loginFailedAction({ errorMessage: 'Failed to login. There is no such user' });
            })
          )
      })
    )
  });
  
  signUp$ = createEffect(() => {
    return this.actions.pipe(
      ofType(signUpAction),
      switchMap((payLoad) => {
        return this.authService.signUp(payLoad.userName, payLoad.password)
          .pipe(
            map((user: User) => {
              return signUpSuccessAction({ token: user.token!, userName: user.userName! });
            })
          )
      })
    )
  }, { dispatch: false });

  logout$ = createEffect(() => {
    return this.actions.pipe(
      ofType(logoutAction),
      tap(() => {
          return this.authService.logout()
      })
    )
  }, { dispatch: false });

  loadUser$ = createEffect(() => {
      return this.actions.pipe(
        ofType(loadUser),
        map(() => {
            if (this.authService.isLoggedin) {
                return loadUserSuccessfully({ user: this.authService.currentUserValue });
            }
            return loadUserFailed({ errorMessage: 'lol' });
        })
      );
  })
}
