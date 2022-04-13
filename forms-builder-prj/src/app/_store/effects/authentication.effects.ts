import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from '../../_services/authentication.service';
import { User } from 'src/app/_models/user';
import {
  loginAction, loginFailedAction, loginSuccessAction, logoutAction, signUpAction, signUpSuccessAction
} from '../actions/user.action';

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
            map((user: User[]) => {
              console.log(user);
              if (Object.keys(user).length !== 0) {
                return loginSuccessAction({ user: user[0] });
              }
              return loginFailedAction({ error: 'Failed to login. There is no such user' });
            })
          )
      })
    )
  });

  signUp$ = createEffect(() => {
    return this.actions.pipe(
      ofType(signUpAction),
      switchMap((payLoad) => {
        return this.authService.signUp(payLoad.userName, payLoad.password, payLoad.token)
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
    )
  })
}
