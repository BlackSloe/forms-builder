import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private _currentUserSubject: BehaviorSubject<User>;
    public currentUser$: Observable<User>;

    public isLoggedin: boolean;

    constructor(private http: HttpClient) {
        const user = JSON.parse(localStorage.getItem('currentUser')) as User;

        this._currentUserSubject = new BehaviorSubject<User>(user);

        if (user) {
            this.isLoggedin = true;
        }

        this.currentUser$ = this._currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this._currentUserSubject.value;
    }

    public login(userName: string, password: string): Observable<any> {
        const uri = `${environment.apiUrl}/users?userName=${userName}&password=${password}`;

        return this.http.get<User>(uri)
            .pipe(mergeMap(user => {
                this.isLoggedin = true;

                return this.http.post(`${environment.backApiUrl}/token/generateToken`,
                    { id: user[0].id, userName: user[0].userName },
                    { responseType: 'text' })
                    .pipe(map(token => {
                        const loggedInUser = Object.assign(user[0]);
                        loggedInUser.token = token;

                        localStorage.setItem('currentUser', JSON.stringify(loggedInUser));

                        this._currentUserSubject.next(loggedInUser);

                        return loggedInUser;
                    }));
            }));
    }

    public signUp(userName: string, password: string): Observable<User> {
        return this.http.post<User>(`${environment.apiUrl}/users`, { userName, password, token: '' });
    }

    public logout() {
        this.isLoggedin = false;

        localStorage.removeItem('currentUser');

        this._currentUserSubject.next(null);
    }
}
