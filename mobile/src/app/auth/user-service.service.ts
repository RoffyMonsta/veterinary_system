import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorageService} from '../auth/token-storage.service';
import { tap } from 'rxjs/operators';
import { BASE_URL } from 'src/conf/settings';
@Injectable()
export class UserService {
  constructor(private http: HttpClient, private token: TokenStorageService) { }
  updateUser(credentials): Observable<any> {
    console.log(credentials);
    return this.http.put(BASE_URL + '/api/user/' + this.token.getUser().id, {
      imgurl: credentials.imgurl,
      fullname: credentials.fullname
    });
  }
}
