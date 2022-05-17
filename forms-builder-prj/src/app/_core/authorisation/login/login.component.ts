import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/_store/app.states';
import { loginAction } from 'src/app/_store/actions/user.actions';
import { selectIsUserAuthenticated } from 'src/app/_store/selectors/authentication.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm!: FormGroup;
  private _destroy: Subscription;

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: [''],
      password: ['']
    });

    this._destroy = this.store.select(selectIsUserAuthenticated).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/homepage']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this._destroy) {
      this._destroy.unsubscribe();
    }
  }

  public login(): void {
    const userPayload = this.loginForm.value;

    const userName = userPayload['userName'];
    const password = userPayload['password'];

    if (userName === '' || password === '') {
      return;
    }
    this.store.dispatch(loginAction({
      userName,
      password
    }));
  }
}
