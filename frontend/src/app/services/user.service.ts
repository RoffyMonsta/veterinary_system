import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorageService} from '../auth/token-storage.service';
import {User} from './../models/user.model'
import { tap } from 'rxjs/operators';
const API_URL = 'http://localhost:8080/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User
  constructor(private http: HttpClient, private token: TokenStorageService) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getDoctorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
  getUser(): Observable<User>{
    return this.http.get<User>(API_URL + 'user/' + this.token.getUser().id).pipe(
      tap(user=>{
        this.currentUser = user;
      })

    )
  }
  updateUser(user): Observable<any> {
    return this.http.put(API_URL + 'user/' + this.token.getUser().id, {
      fullname: user.fullname,
      imgurl: user.imgurl
    }, httpOptions)
  }
}
