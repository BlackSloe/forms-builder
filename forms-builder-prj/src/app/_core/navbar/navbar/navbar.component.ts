import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from 'src/app/_store/app.states';
import { Store } from '@ngrx/store';
import { selectAuthenticatedUser, selectIsUserAuthenticated } from 'src/app/_store/selectors/authentication.selectors';
import { Router } from '@angular/router';
import { logoutAction } from 'src/app/_store/actions/user.action';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean;
  
  private _userName: string= '';
  constructor(private store: Store<AppState>,
    private router: Router) { }


  public get userName(): string {
    return this._userName;
  }

  ngOnInit(): void {
    this.store.select(selectIsUserAuthenticated)
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });

    this.store.select(selectAuthenticatedUser)
      .subscribe(user => {
        this._userName = user.userName;
      });
  }

  public logoutBtnClick(): void {
    this.store.dispatch(logoutAction());
    this.router.navigate(['/login']);
  }
}
