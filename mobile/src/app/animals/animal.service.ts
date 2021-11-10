import { Observable, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Animal } from './animal.model';
import { TokenStorageService } from '../auth/token-storage.service';
import { Select } from '@ngxs/store';
import { AuthState } from '../auth/auth.state';
import { BASE_URL } from '../../conf/settings';

@Injectable()
export class AnimalService implements OnDestroy {
  @Select (AuthState.userId) userId$: Observable<number>;
  userId: number;
  sub = new Subscription();

  constructor(private http: HttpClient, private token: TokenStorageService) {
    this.sub.add(
      this.userId$.subscribe(
        val=>{
          this.userId = val;
        }
      )
    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  fetchAll(): Observable<Animal[]>{
    return this.http.get<Animal[]>(BASE_URL+'/api/animal', {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders({ 'Content-Type': 'application/json' , userid: this.userId.toString()})
    });
  }
  fetchById(id: number): Observable<Animal>{
    return this.http.get<Animal>(BASE_URL+'/api/animal/'+id, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders({ 'Content-Type': 'application/json' , userid: this.userId.toString()})
    });
  }
  addAnimal(animal): Observable<any> {
    return this.http.post(BASE_URL+'/api/animal', {
      userid: animal.userId,
      name: animal.name,
      imgurl: animal.imgurl,
      age: animal.age,
      vaccinated: animal.vaccinated,
      passport: animal.passport,
      kind: animal.kind,
      breed: animal.breed
    }, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders({ 'Content-Type': 'application/json' , userid: this.userId.toString()})
    });
  }

  delete(id: number): Observable<Animal>{
    return this.http.delete<Animal>(BASE_URL+'/api/animal/'+id, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders({ 'Content-Type': 'application/json' , userid: this.userId.toString()})
    });
  }
}
