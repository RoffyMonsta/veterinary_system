import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const API_URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  schedule: any
  constructor(private http: HttpClient) { }
  getScheduleById(id: number){
    return this.http.get(API_URL + 'schedule/' + id).pipe(
      tap(schedule=>{
        this.schedule = schedule;
      })

    )
  }
  add(animalId: number, scheduleId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'animalid': animalId.toString()})
    };
    return this.http.put(API_URL+'schedule/' + scheduleId,{}, httpOptions);
  }
}
