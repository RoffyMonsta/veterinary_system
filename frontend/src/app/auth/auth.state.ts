import { Injectable } from "@angular/core";
import { State, NgxsOnInit, Store, Action, StateContext, Selector } from "@ngxs/store";
import { Login, LoginFail, LoginSuccess, Register, RegisterFail, RegisterSuccess } from "./auth.actions";
import { AuthService } from "./auth.service";
import { TokenStorageService } from "./token-storage.service";
import { Navigate } from '@ngxs/router-plugin';

export class AuthStateModel {
  loading: boolean;
  loaded: boolean;
  error: string;
  user: any;
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
    private tokenService: TokenStorageService
  ) {}
  @Selector()
  static error(state: AuthStateModel): string{
    return state.error;
  };

  @Selector()
  static user(state: AuthStateModel):any{
    return state.user;
  };

  @Selector()
  static isLoaded(state: AuthStateModel):boolean{
    return state.loaded;
  };

  ngxsOnInit(){}

  @Action(Login)
  login(
    ctx: StateContext<AuthStateModel>, {credentials} : Login) {
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
    ctx: StateContext<AuthStateModel>, {userData} : LoginSuccess) {
      console.log(userData)
      ctx.patchState({
        loading: false,
        loaded: true,
        user: userData
      });

      this.tokenService.saveUser(userData);
      this.tokenService.saveToken(userData.token);
      ctx.dispatch(new Navigate(['/pets']));
  }

  @Action(LoginFail)
  loginFail(
    ctx: StateContext<AuthStateModel>, {err} : LoginFail) {
      ctx.patchState({
        loading: false,
        loaded: false,
        error: 'User not found'
      });
  }

  @Action(Register)
  register(
    ctx: StateContext<AuthStateModel>, {credentials} : Register) {
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
    ctx: StateContext<AuthStateModel>, {userData} : RegisterSuccess) {
      console.log(userData)
      ctx.patchState({
        loading: false,
        loaded: true
      });
      ctx.dispatch(new Navigate(['/auth/login']));
  }

  @Action(RegisterFail)
  registerFail(
    ctx: StateContext<AuthStateModel>, {err} : LoginFail) {
      ctx.patchState({
        loading: false,
        loaded: false,
        error: err.message
      });
  }
}

