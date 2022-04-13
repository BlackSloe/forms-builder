import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationGuard } from 'src/app/_helpers/authentication.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let guard: AuthenticationGuard;
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
});
