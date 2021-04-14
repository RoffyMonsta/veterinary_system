import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Animal } from '../models/animal.model';
import { TokenStorageService } from './token-storage.service';
import { tap } from 'rxjs/operators';
const API_URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  animals: Animal[]
  userId: number = this.token.getUser().id
  constructor(private http: HttpClient, private token: TokenStorageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'userid': this.userId.toString()})
  };
  fetchAll(): Observable<Animal[]>{
    return this.http.get<Animal[]>(API_URL+'animal', this.httpOptions).pipe(
      tap(animals=>{
        this.animals = animals
      })
    )
  }
  add(animal): Observable<any> {
    return this.http.post(API_URL+'animal', {
      userid: animal.userId,
      name: animal.name,
      imgurl: animal.imgurl,
      age: animal.age
    },this.httpOptions);
  }
}
