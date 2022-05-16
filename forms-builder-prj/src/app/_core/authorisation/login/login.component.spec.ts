import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthenticationGuard } from 'src/app/_helpers/authentication.guard';
import { selectIsUserAuthenticated } from 'src/app/_store/selectors/authentication.selectors';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let guard: AuthenticationGuard;
  let storeMock: MockStore;

  const initialState = { isAuthenticated: true };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        AuthenticationGuard,
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();

    storeMock = TestBed.inject(MockStore);
    guard = TestBed.inject(AuthenticationGuard);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      storeMock.overrideSelector(selectIsUserAuthenticated, true);
    });

    it('should navigate if user is authorized', () => {
      const routerSpy = spyOn(component['router'], 'navigate');

      component.ngOnInit();

      expect(routerSpy).toHaveBeenCalledOnceWith(['/homepage']);
    });
  });

  describe('login', () => {
    it('should dispacth userName and password', () => {
      component.loginForm = new FormBuilder().group({
        userName: ['123'],
        password: ['123']
      });
      const dispatchSpy = spyOn(storeMock, 'dispatch');

      component.login();

      expect(dispatchSpy).toHaveBeenCalled();
    });

    it('should not dispatch userName and password if field inputs and empty strings', () => {
      component.loginForm = new FormBuilder().group({
        userName: [''],
        password: ['']
      });
      const dispatchSpy = spyOn(storeMock, 'dispatch');

      component.login();

      expect(dispatchSpy).not.toHaveBeenCalled();
    });

    it('should not dispatch userName input field if it is empty string', () => {
      component.loginForm = new FormBuilder().group({
        userName: [''],
        password: ['123']
      });
      const dispatchSpy = spyOn(storeMock, 'dispatch');

      component.login();

      expect(dispatchSpy).not.toHaveBeenCalled();
    });

    it('should not dispatch password input field if it is empty string', () => {
      component.loginForm = new FormBuilder().group({
        userName: ['123'],
        password: ['']
      });
      const dispatchSpy = spyOn(storeMock, 'dispatch');

      component.login();

      expect(dispatchSpy).not.toHaveBeenCalled();
    });
  });
});
