import { UpdateData, User } from './auth.model';
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { State, NgxsOnInit, Store, Action, StateContext, Selector } from '@ngxs/store';
import {
  Login,
  LoginFail,
  LoginSuccess,
  Logout,
  Register,
  RegisterFail,
  RegisterSuccess,
  UpdateUser,
  UpdateUserFail,
  UpdateUserSuccess
} from './auth.actions';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';
import { Navigate } from '@ngxs/router-plugin';
import { UserService } from './user-service.service';

export class AuthStateModel {
  loading: boolean;
  loaded: boolean;
  error: string;
  user: User;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    loading: false,
    loaded: false,
    error: null,
    user: null
  },
})
@Injectable()
export class AuthState implements NgxsOnInit {
  constructor(
    private auth: AuthService,
    private tokenService: TokenStorageService,
    private userService: UserService
  ) {}
  @Selector()
  static error(state: AuthStateModel): string{
    return state.error;
  };

  @Selector()
  static user(state: AuthStateModel): User{
    console.log(state.user);
    return state.user;
  };

  @Selector()
  static userId(state: AuthStateModel): number{
    return state.user.id;
  }
  @Selector()
  static isLoaded(state: AuthStateModel): boolean{
    return state.loaded;
  };

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean{
    if(state.user){
      return true;
    }
    else {
      return false;
    }
  }

  ngxsOnInit(ctx: StateContext<AuthStateModel>){
    ctx.patchState({
      user: this.tokenService.getUser()
    });
  }

  @Action(Login)
  login(
    ctx: StateContext<AuthStateModel>, {credentials}: Login) {
    ctx.patchState({
      loading: true,
      loaded: false
    });
    this.auth.login(credentials).subscribe(
      userData => ctx.dispatch(new LoginSuccess(userData)),
      err => ctx.dispatch(new LoginFail(err))
    );
  }

  @Action(LoginSuccess)
  loginSuccess(
    ctx: StateContext<AuthStateModel>, {userData}: LoginSuccess) {
      console.log(userData);
      ctx.patchState({
        loading: false,
        loaded: true,
        user: userData
      });

      this.tokenService.saveUser(userData);
      this.tokenService.saveToken(userData.accessToken);
      ctx.dispatch(new Navigate(['/tabs']));
  }

  @Action(LoginFail)
  loginFail(
    ctx: StateContext<AuthStateModel>, {err}: LoginFail) {
      ctx.patchState({
        loading: false,
        loaded: false,
        error: err.error.message
      });
  }

  @Action(Register)
  register(
    ctx: StateContext<AuthStateModel>, {credentials}: Register) {
    ctx.patchState({
      loading: true,
      loaded: false
    });
    this.auth.register(credentials).subscribe(
      userData => ctx.dispatch(new RegisterSuccess(userData)),
      err => ctx.dispatch(new RegisterFail(err))
    );
  }

  @Action(RegisterSuccess)
  registerSuccess(
    ctx: StateContext<AuthStateModel>, {success}: RegisterSuccess) {
      ctx.patchState({
        loading: false,
        loaded: true
      });
      ctx.dispatch(new Navigate(['/tabs/auth/login']));
  }

  @Action(RegisterFail)
  registerFail(
    ctx: StateContext<AuthStateModel>, {err}: LoginFail) {
      ctx.patchState({
        loading: false,
        loaded: false,
        error: err.error.message
      });
  }

  @Action(Logout)
  logout(
    ctx: StateContext<AuthStateModel>, {err}: LoginFail) {
      this.tokenService.signOut();
      ctx.patchState({
        user: null
      });
      ctx.dispatch(new Navigate(['/tabs/auth/login']));
  }
  @Action(UpdateUser)
  updateUser(
    ctx: StateContext<AuthStateModel>, {credentials}: UpdateUser) {
    ctx.patchState({
      loading: true,
      loaded: false
    });
    this.userService.updateUser(credentials).subscribe(
      userData => ctx.dispatch(new UpdateUserSuccess(credentials)),
      err => ctx.dispatch(new LoginFail(err))
    );
  }

  @Action(UpdateUserSuccess)
  updateUserSuccess(
    ctx: StateContext<AuthStateModel>, {userData}: UpdateUserSuccess) {
      console.log(userData);
      const state = ctx.getState();
      const user = {...state.user};
      user.imgurl = userData.imgurl;
      user.fullname = userData.fullname;
      ctx.patchState({
        loading: false,
        loaded: true,
        user
      });
      this.tokenService.saveUser(user);
  }

  @Action(UpdateUserFail)
  updateUserFail(
    ctx: StateContext<AuthStateModel>, {err}: UpdateUserFail) {
      ctx.patchState({
        loading: false,
        loaded: false,
        error: err.error.message
      });
  }

}

