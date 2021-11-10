import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Select } from '@ngxs/store';
import { from, Observable, Subscription } from 'rxjs';
import { AuthState } from '../auth/auth.state';
import { TokenStorageService } from '../auth/token-storage.service';
import { BASE_URL } from '../../conf/settings';
import { Clinic, Doctor } from './symptom.model';
@Injectable()
export class SymptomService {
  @Select (AuthState.userId) userId$: Observable<number>;
  userId: number;
  sub = new Subscription();
  constructor(private geolocation: Geolocation, private http: HttpClient, private token: TokenStorageService) {
    this.sub.add(
      this.userId$.subscribe(
        val=>{
          this.userId = val;
        }
      )
    );
  }

  getLocation(){
    return from(this.geolocation.getCurrentPosition());
  }

  getClinics(): Observable<Clinic[]>{
    return this.http.get<Clinic[]>(BASE_URL+'/api/clinics', {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getDoctors(): Observable<Doctor[]>{
    return this.http.get<Doctor[]>(BASE_URL+'/api/doctor', {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    });
  }
}
