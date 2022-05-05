import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('authentication service', () => {
    let httpTestingController: HttpTestingController;
    let service: AuthenticationService;
    let storeMock: MockStore;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [AuthenticationService, provideMockStore({})],
            imports: [HttpClientTestingModule]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(AuthenticationService);
        storeMock = TestBed.inject(MockStore);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('login', () => {
        it('should return user with get method', () => {
            const mockUser = {
                userName: "test",
                password: "test",
                token: "123token",
                id: 1
            };
            const url = `http://localhost:3000/users?userName=${mockUser.userName}&password=${mockUser.password}`;

            service.login(mockUser.userName, mockUser.password)
                .subscribe(user => {
                    expect(user).toEqual(mockUser);
                });

            const req = httpTestingController.expectOne(url);

            expect(req.request.method).toEqual('GET');

            req.flush(mockUser);
        });
    });

    describe('signUp', () => {
        it('should sign up new user with post method', () => {
            const mockUser = {
                userName: "test",
                password: "test",
                token: '',
                id: 999
            };
            const url = `http://localhost:3000/users`;

            service.signUp(mockUser.userName, mockUser.password)
                .subscribe(user => {
                    expect(user).toEqual(mockUser);
                });

            const req = httpTestingController.expectOne(url);

            expect(req.request.method).toEqual('POST');

            req.flush(mockUser);
        });

       

    });

    describe('logout', () => {
        it('should clear session storage', () => {
            const sessionStorageSpy = spyOn(localStorage, 'removeItem');
            const currentUserSpy = spyOn(service['currentUserSubject'], 'next');

            service.logout();

            expect(sessionStorageSpy).toHaveBeenCalledWith('currentUser');
            expect(currentUserSpy).toHaveBeenCalledWith(null);
        });
    });
});