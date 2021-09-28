import { HttpErrorResponse } from '@angular/common/http';
import { UpdateData, User } from './auth.model';
import { LoginData, RegisterData } from './auth.model';


export class Login {
  static type = '[Auth] Login';
  constructor(public credentials: LoginData) {}
}
export class LoginSuccess {
  static type = '[Auth] LoginSuccess';
  constructor(public userData: User) {}
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
  constructor(public  success: string) {}
}

export class RegisterFail {
  static type = '[Auth] RegisterFail';
  constructor(public err: HttpErrorResponse) {}
}
export class Logout {
  static type = '[Auth] Logout';
}

export class UpdateUser {
  static type = '[Auth] UpdateUser';
  constructor(public credentials: UpdateData) {}
}
export class UpdateUserSuccess {
  static type = '[Auth] UpdateUserSuccess';
  constructor(public userData: UpdateData) {}
}

export class UpdateUserFail {
  static type = '[Auth] UpdateUserFail';
  constructor(public err: HttpErrorResponse) {}
}
