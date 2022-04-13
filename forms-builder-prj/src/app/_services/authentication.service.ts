import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(
            JSON.parse(localStorage.getItem('currentUser') || '{}'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public login(userName: string, password: string): Observable<any> {
        const uri = `${environment.apiUrl}/users?userName=${userName}&password=${password}`;

        return this.http.get<any>(uri)
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
        }));
    }

    public signUp(userName: string, password: string, token: string): Observable<User> {
        return this.http.post<User>(`${environment.apiUrl}/users`, { userName, password, token });
    }

    public logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(new User());
    }
}
