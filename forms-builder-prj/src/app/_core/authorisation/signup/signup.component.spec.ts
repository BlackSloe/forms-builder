import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthenticationGuard } from '../../../_helpers/authentication.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let guard: AuthenticationGuard;
  let storeMock: MockStore;

  const initialState = { isAuthenticated: true };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
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
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('signUp', () => {
    it('should dispacth userName and password', () => {
      component.signupForm = new FormBuilder().group({
        userName: ['1232'],
        password: ['1232']
      });
      const dispatchSpy = spyOn(storeMock, 'dispatch');

      component.signUp();

      expect(dispatchSpy).toHaveBeenCalled();
    });

    it('should not dispatch userName and password if field inputs and empty strings', () => {
      component.signupForm = new FormBuilder().group({
        userName: [''],
        password: ['']
      });
      const dispatchSpy = spyOn(storeMock, 'dispatch');

      component.signUp();

      expect(dispatchSpy).not.toHaveBeenCalled();
    });

    it('should not dispatch userName input field if it is empty string', () => {
      component.signupForm = new FormBuilder().group({
        userName: [''],
        password: ['123']
      });
      const dispatchSpy = spyOn(storeMock, 'dispatch');

      component.signUp();

      expect(dispatchSpy).not.toHaveBeenCalled();
    });

    it('should not dispatch password input field if it is empty string', () => {
      component.signupForm = new FormBuilder().group({
        userName: ['123'],
        password: ['']
      });
      const dispatchSpy = spyOn(storeMock, 'dispatch');

      component.signUp();

      expect(dispatchSpy).not.toHaveBeenCalled();
    });
  });
});
