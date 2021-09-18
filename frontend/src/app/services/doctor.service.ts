import { Doctor } from './../models/doctor.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Animal } from '../models/animal.model';
import { TokenStorageService } from './token-storage.service';
const API_URL = 'http://localhost:8080/api/';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  doctors: Doctor[] = []
  oneDoctor: any
  userId: number = this.token.getUser().id
  constructor(private http: HttpClient, private token: TokenStorageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'userid': this.userId.toString()})
  };
  fetchAll(): Observable<Doctor[]>{
    return this.http.get<Doctor[]>(API_URL+'doctor', this.httpOptions).pipe(
      tap(doctors=>{
        this.doctors = doctors
      })
    )
  }
  fetchById(doctorId: number): Observable<any>{
    return this.http.get<any>(API_URL+'doctor/'+doctorId, this.httpOptions).pipe(
      tap(doctor=>{
        this.oneDoctor = doctor
      })
    )
  }
}
