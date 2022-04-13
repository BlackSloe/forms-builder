import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/_store/app.states';
import { Store } from '@ngrx/store';
import { selectAuthenticatedUser, selectIsUserAuthenticated } from 'src/app/_store/selectors/authentication.selectors';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';
import { logoutAction } from 'src/app/_store/actions/user.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean;
  
  private _userName: string= '';
  private user: User = new User()

  constructor(private store: Store<AppState>,
    private authService: AuthenticationService,
    private router: Router) { }


  public get userName(): string {
    return this._userName;
  }

  ngOnInit(): void {
    this.store.select(selectIsUserAuthenticated).subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });

    this.store.select(selectAuthenticatedUser).subscribe(user => { 
      this.user = user;
      this._userName = this.user.userName;
      console.log(this.user);
      console.log({});
    });
  }

  public logoutBtnClick(): void {
    this.store.dispatch(logoutAction());
    this.router.navigate(['/login']);
  }
}
