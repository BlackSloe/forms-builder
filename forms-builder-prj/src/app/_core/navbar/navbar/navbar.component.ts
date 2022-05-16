import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { AppState } from 'src/app/_store/app.states';
import { selectAuthenticatedUser, selectIsUserAuthenticated } from 'src/app/_store/selectors/authentication.selectors';
import { loadUser, logoutAction } from 'src/app/_store/actions/user.actions';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isAuthenticated$: Observable<boolean>;
  public userName$: Observable<string>;

  constructor(private store: Store<AppState>,
    private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(loadUser());

    this.isAuthenticated$ = this.store.select(selectIsUserAuthenticated);

    this.userName$ = this.store.select(selectAuthenticatedUser).pipe(
      map(user => {
        return user.userName
      })
    );
  }

  public logoutBtnClick(): void {
    this.store.dispatch(logoutAction());
    this.router.navigate(['/login']);
  }
}
