import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppState } from '../_store/app.states';
import { Store } from '@ngrx/store';
import { loginAction } from '../_store/actions/user.action';
import { selectIsUserAuthenticated } from '../_store/selectors/authentication.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: [''],
      password: ['']
    });

    this.store.select(selectIsUserAuthenticated).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        console.log(isAuthenticated);
        this.router.navigate(['/homepage']);
      }
    });
  }

  public login(): void {
    const userPayload = this.loginForm.value;

    this.store.dispatch(loginAction({ userName: userPayload['userName'], password: userPayload['password'] }));
  }
}
