import { HttpErrorResponse } from "@angular/common/http";
import { LoginData, RegisterData } from "./auth.model";


export class Login {
  static type = '[Auth] Login';
  constructor(public credentials: LoginData) {}
}
export class LoginSuccess {
  static type = '[Auth] LoginSuccess';
  constructor(public userData: any) {}
}

export class LoginFail {
  static type = '[Auth] LoginFail';
  constructor(public err: HttpErrorResponse) {}
}

export class Register {
  static type = '[Auth] Register';
  constructor(public credentials: RegisterData) {}
}
export class RegisterSuccess {
  static type = '[Auth] RegisterSuccess';
  constructor(public  userData: any) {}
}

export class RegisterFail {
  static type = '[Auth] RegisterFail';
  constructor(public err: HttpErrorResponse) {}
}
