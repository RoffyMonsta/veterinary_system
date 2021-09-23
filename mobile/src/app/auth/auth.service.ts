import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/conf/settings';
import { User } from './auth.model';


@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }
  login(credentials): Observable<User> {
    return this.http.post<User>(BASE_URL + '/api/auth/signin', {
      email: credentials.email,
      password: credentials.password
    });
  }

  register(user): Observable<string> {
    return this.http.post<string>(BASE_URL + '/api/auth/signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}
