import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppState } from '../../../_store/app.states';
import { Store } from '@ngrx/store';
import { signUpAction } from '../../../_store/actions/user.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      userName: [''],
      password: ['']
    });
  }

  public signUp(): void {
    const userPayload = this.signupForm.value;

    const userName = userPayload['userName'];
    const password = userPayload['password'];

    if (userName === '' || password === '') {
      return;
    }

    this.store.dispatch(signUpAction({
      userName,
      password,
      token: '123token'
    }));
  }
}
