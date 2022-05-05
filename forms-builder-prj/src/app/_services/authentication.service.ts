import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../_store/app.states';
import { loginAction, loginSuccessAction } from '../_store/actions/user.actions';
import { selectAuthenticatedUser } from '../_store/selectors/authentication.selectors';
// import { JWTMockService } from './jwt.mock.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser$: Observable<User>;
    public isLoggedin: boolean;

    constructor(private http: HttpClient, private store: Store<AppState>) {
        let user = JSON.parse(localStorage?.getItem('currentUser'));
        // console.log(user);

        this.currentUserSubject = new BehaviorSubject<User>(user || '{}');
        
         user = user ? user[0] : null;

        if (user?.id) {
            this.isLoggedin = true;
            // this.store.dispatch(loginSuccessAction({ user: user}));
            // this.store.select(selectAuthenticatedUser).subscribe(u => console.log(u));
        }
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public login(userName: string, password: string): Observable<any> {
        const uri = `${environment.apiUrl}/users?userName=${userName}&password=${password}`;

        return this.http.get<User>(uri)
            .pipe(mergeMap(user => {
                let loggedInUser = JSON.parse(JSON.stringify(user[0]));

                this.isLoggedin = true;

                const uid = loggedInUser.id;
                const userName = loggedInUser.userName;

                return this.http.post(`${environment.backApiUrl}/token/generateToken`,
                    { id: uid, userName: userName },
                    { responseType: 'text' })
                    .pipe(map(token => {
                        const l = { id: loggedInUser.id, userName: loggedInUser.userName, password: loggedInUser.password, token: token } as User

                        localStorage.setItem('currentUser', JSON.stringify(l));

                        this.currentUserSubject.next(l);
                        return l;
                }));
                
            }));
    }

    public signUp(userName: string, password: string): Observable<User> {
        return this.http.post<User>(`${environment.apiUrl}/users`, { userName, password, token: '' });
    }

    public logout() {
        this.isLoggedin = false;

        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
