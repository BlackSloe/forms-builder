import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationGuard } from 'src/app/_helpers/authentication.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { selectAuthenticatedUser, selectIsUserAuthenticated } from 'src/app/_store/selectors/authentication.selectors';
import { User } from 'src/app/_models/user';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let storeMock: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        AuthenticationGuard,
        provideMockStore({ })
      ]
    })
    .compileComponents();

    storeMock = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('logout', () => {
    it('should logout', () => {
        const dispatchSpy = spyOn(storeMock, 'dispatch');
        const routerSpy = spyOn(component['router'], 'navigate');

        component.logoutBtnClick();

        expect(dispatchSpy).toHaveBeenCalled();
        expect(routerSpy).toHaveBeenCalledOnceWith(['/login']);
    });
  });

  describe('ngOnInit', () => {
    it('should select isAuthenticated', () => {
      const expectedIsAuthenticated = false;
      storeMock.overrideSelector(selectIsUserAuthenticated, expectedIsAuthenticated);

      component.ngOnInit();

      expect(component.isAuthenticated).toEqual(expectedIsAuthenticated);
    });

    it('should select userName if there is one', () => {
      const expectedUserName = 'mykola';
      const userMock: User = {
        id: 0,
        userName: 'mykola',
        password: '123',
        token: 'token'
      };
      storeMock.overrideSelector(selectAuthenticatedUser, userMock);

      component.ngOnInit();

      expect(component.userName).toEqual(expectedUserName);
    });
  });
});
