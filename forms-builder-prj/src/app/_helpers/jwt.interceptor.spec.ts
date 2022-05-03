// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { TestBed } from '@angular/core/testing';
// import {
//     MockBuilder,
//     MockRender,
//     NG_MOCKS_INTERCEPTORS
// } from 'ng-mocks';
// import { AppModule } from '../app.module';
// import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { JwtInterceptor } from './jwt.interceptor';
// import { AuthenticationService } from '../_services/authentication.service';
// import { MockStore, provideMockStore } from '@ngrx/store/testing';

// describe('JwtInterceptor', () => {
//     let authenticationService: AuthenticationService;
//     let storeMock: MockStore;

//     beforeEach(async () => {
//         await TestBed.configureTestingModule({
//             imports: [HttpClientTestingModule],
//             providers: [AuthenticationService, provideMockStore({})]
//         });
//     });

//     beforeEach(() => {
//         authenticationService = TestBed.inject(AuthenticationService);
//         storeMock = TestBed.inject(MockStore);

//         return MockBuilder(JwtInterceptor, AppModule).
//             exclude(NG_MOCKS_INTERCEPTORS).
//             keep(HTTP_INTERCEPTORS).
//             replace(HttpClientModule, HttpClientTestingModule);
//     });

//     it('should have authorization in header', () => {
//         const fixture = MockRender('');
//         const client: HttpClient =
//             fixture.debugElement.injector.get(HttpClient);
//         const httpMock: HttpTestingController =
//             fixture.debugElement.injector.get(HttpTestingController);

//         authenticationService.isLoggedin = true;
//         authenticationService.login('test', 'test');

//         client.get('/testroute').subscribe();

//         const httpRequest = httpMock.expectOne('/testroute');

//         expect(httpRequest.request.headers.get('Authorization')).toEqual('123token');
//     })
// });