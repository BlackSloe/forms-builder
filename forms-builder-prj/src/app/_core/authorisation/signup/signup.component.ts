import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/_store/app.states';
import { signUpAction } from 'src/app/_store/actions/user.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>) { }

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

    if (userName.length < 4 || password < 4) {
      return;
    }

    this.store.dispatch(signUpAction({
      userName,
      password,
      token: '123token'
    }));
  }
}
