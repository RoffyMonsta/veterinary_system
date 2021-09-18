import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
const API_URL = 'http://localhost:8080/api/';
@Injectable({
  providedIn: 'root'
})
export class VisitService {

  allVisits: any = []
  userId: number = this.token.getUser().id

  constructor(private http: HttpClient, private token: TokenStorageService) {

  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'userid': this.userId.toString()})
  };
  fetchAll(){
    return this.http.get(API_URL+'visit', this.httpOptions).pipe(
      tap(visits=>{
        this.allVisits = visits
      })
    )
  }
}
