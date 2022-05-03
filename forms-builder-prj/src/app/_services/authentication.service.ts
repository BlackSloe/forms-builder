import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../_store/app.states';
import { loginAction, loginSuccessAction } from '../_store/actions/user.actions';
import { selectAuthenticatedUser } from '../_store/selectors/authentication.selectors';
import { JWTMockService } from './jwt.mock.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser$: Observable<User>;
    public isLoggedin: boolean;

    constructor(private http: HttpClient, private store: Store<AppState>, private jwtMockService: JWTMockService) {
        let user = JSON.parse(sessionStorage.getItem('currentUser'));
        console.log(jwtMockService.createJWT('123', '213', 0));
        this.currentUserSubject = new BehaviorSubject<User>(user || '{}');
        
        user = user ? user[0] : null;

        if (user?.id) {
            this.isLoggedin = true;
            this.store.dispatch(loginSuccessAction({ user: user}));
            this.store.select(selectAuthenticatedUser).subscribe(u => console.log(u));
        }
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public login(userName: string, password: string): Observable<any> {
        const uri = `${environment.apiUrl}/users?userName=${userName}&password=${password}`;
        this.isLoggedin = true;

        return this.http.get<any>(uri)
            .pipe(map(user => {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
        }));
    }

    public signUp(userName: string, password: string, token: string): Observable<User> {
        return this.http.post<User>(`${environment.apiUrl}/users`, { userName, password, token });
    }

    public logout() {
        this.isLoggedin = false;

        sessionStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
