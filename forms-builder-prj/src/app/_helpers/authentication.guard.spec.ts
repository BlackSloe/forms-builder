import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthenticationService } from '../_services/authentication.service';
import { AuthenticationGuard } from './authentication.guard';

describe('Authentication Guard', () => {
    let authenticationGuard: AuthenticationGuard;
    let authenticationService: AuthenticationService;
    let router = {
        navigate: jasmine.createSpy('navigate')
    };
    let routeMock: any = { snapshot: {}};
    let routerStateMock: any = { snapshot: {}, url: '/homepage'};
    let storeMock: MockStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: 
                [
                    AuthenticationGuard,
                    AuthenticationService,
                    provideMockStore({}),
                    { provide: Router, useValue: router }
                ],
            imports: [HttpClientTestingModule]
        }).compileComponents();
    });

    beforeEach(() => {
        authenticationGuard = TestBed.inject(AuthenticationGuard);
        authenticationService = TestBed.inject(AuthenticationService);
        storeMock = TestBed.inject(MockStore);
    });

    it('should be able to hit route when user is logged in', () => {
        authenticationService.isLoggedin = true;
        expect(authenticationGuard.canActivate(routeMock, routerStateMock)).toBe(true);
    });

    it('should not be able to hit route when user is not logged in', () => {
        authenticationService.isLoggedin = false;
        expect(authenticationGuard.canActivate(routeMock, routerStateMock)).toBe(false);
    });
});