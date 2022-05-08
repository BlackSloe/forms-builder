import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { User } from 'src/app/_models/user';
import {
  loadUser,
  loadUserFailed,
  loadUserSuccessfully,
  loginAction,
  loginFailedAction,
  loginSuccessAction,
  logoutAction,
  signUpAction,
  signUpSuccessAction
} from '../actions/user.actions';
import { reducers } from '../app.states';

describe('authentication reducers', () => {
  let storeMock: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideMockStore({ })
      ]
    })
    .compileComponents();

    storeMock = TestBed.inject(MockStore);
  });

  describe('authenticationReducer', () => {
    it('should login action', () => {
      const mockUser: User = {
        userName: 'test',
        password: 'test',
        token: '123token',
        id: 1
      };

      const initialState: any = {};

      const expectedState = {
        isAuthenticated: false,
        user: new User(),
        errorMessage: null
      };

      const createAction = loginAction({ userName: mockUser.userName, password: mockUser.userName });

      const actualState = reducers.authenticationReducer(initialState, createAction);

      expect(actualState).toEqual(expectedState);
    });

    it('should loginSuccess action', () => {
      const mockUser: User = {
        userName: 'test',
        password: 'test',
        token: '123token',
        id: 1
      };

      const initialState: any = {};

      const expectedState = {
        isAuthenticated: true,
        user: mockUser,
        errorMessage: null
      };

      const createAction = loginSuccessAction({ user: mockUser });

      const actualState = reducers.authenticationReducer(initialState, createAction);

      expect(actualState).toEqual(expectedState);
    });

    it('should loginFailed action', () => {
      const errorMessage = 'error message 123 test';
      const initialState: any = {};

      const expectedState = {
        isAuthenticated: false,
        errorMessage
      };

      const createAction = loginFailedAction({ errorMessage });

      const actualState = reducers.authenticationReducer(initialState, createAction);

      expect(actualState.errorMessage).toEqual(expectedState.errorMessage);
      expect(actualState.isAuthenticated).toEqual(expectedState.isAuthenticated);
    });

    it('should signUp action', () => {
      const mockUser: User = {
        userName: 'test',
        password: 'test',
        token: '123token',
        id: 1
      };

      const initialState: any = {};

      const expectedState = {
        isAuthenticated: false,
        user: new User(),
        errorMessage: null
      };

      const createAction = signUpAction(
        { userName: mockUser.userName, password: mockUser.password, token: mockUser.token }
      );

      const actualState = reducers.authenticationReducer(initialState, createAction);

      expect(actualState).toEqual(expectedState);
    });

    it('should signUpSuccess action', () => {
      const mockUser: User = {
        userName: 'test',
        password: 'test',
        token: '123token',
        id: 1
      };

      const initialState: any = {};

      const expectedState = {
        isAuthenticated: false,
        user: mockUser,
        errorMessage: null
      };

      const createAction = signUpSuccessAction({ userName: mockUser.userName, token: mockUser.token });

      const actualState = reducers.authenticationReducer(initialState, createAction);

      expect(actualState.user.userName).toEqual(expectedState.user.userName);
      expect(actualState.user.token).toEqual(expectedState.user.token);
    });

    it('should logout action', () => {
      const initialState: any = {};

      const expectedState = {
        isAuthenticated: false,
        user: new User(),
        errorMessage: null
      };

      const createAction = logoutAction();

      const actualState = reducers.authenticationReducer(initialState, createAction);

      expect(actualState.user).toEqual(expectedState.user);
    });

    it('should loaduser action', () => {
      const user: User = {
        id: 0,
        userName: 'q',
        password: 'q',
        token: 'q'
      };

      const initialState: any = {
        user
      };

      const expectedState = {
        user
      };

      const createAction = loadUser();

      const actualState = reducers.authenticationReducer(initialState, createAction);

      expect(actualState.user).toEqual(expectedState.user);
    });

    it('should loadUserSuccessfully action', () => {
      const user: User = {
        id: 0,
        userName: 'q',
        password: 'q',
        token: 'q'
      };

      const initialState: any = {};

      const expectedState = {
        user
      };

      const createAction = loadUserSuccessfully({ user });

      const actualState = reducers.authenticationReducer(initialState, createAction);

      expect(actualState.user).toEqual(expectedState.user);
    });

    it('should loadUserFailed action', () => {
      const errorMessage = 'Error 123';

      const initialState: any = {};

      const expectedState = {
        errorMessage
      };

      const createAction = loadUserFailed({ errorMessage });

      const actualState = reducers.authenticationReducer(initialState, createAction);

      expect(actualState.errorMessage).toEqual(expectedState.errorMessage);
    });
  });
});
