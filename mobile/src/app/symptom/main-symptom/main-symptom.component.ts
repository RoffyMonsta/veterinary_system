import { GetDoctors, GetClinics, SearchForClinics, SetClinicsToNull } from './../symptom.actions';
import { Observable, Subscription } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Select, Store } from '@ngxs/store';
import { GetLocation } from '../symptom.actions';
import { SymptomState } from '../symptom.state';
import { Clinic, Coordinates } from '../symptom.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthState } from 'src/app/auth/auth.state';
import { AnimalState } from 'src/app/animals/animal.state';
import { Animal } from 'src/app/animals/animal.model';
@Component({
  selector: 'app-main-symptom',
  templateUrl: './main-symptom.component.html',
  styleUrls: ['./main-symptom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSymptomComponent implements OnInit, OnDestroy {
  @Select (SymptomState.coords) coords$: Observable<Coordinates>;
  @Select (SymptomState.symptoms) symptoms$: Observable<string[]>;
  @Select (SymptomState.error) error$: Observable<string>;
  @Select (AuthState.isAuthenticated) isAuth$: Observable<boolean>;
  @Select (AnimalState.animals) animals$: Observable<Animal[]>;
  @Select (SymptomState.clinicsToShow) clinicsToShow$: Observable<Clinic[]>;
  selectedSymptoms: string[];
  sub = new Subscription();
  form: FormGroup;
  form2: FormGroup;
  ageFormControl = new FormControl('', [
    Validators.required
  ]);
  vaccinatedFormControl = new FormControl('', [
    Validators.required
  ]);
  passportFormControl = new FormControl('', [
    Validators.required
  ]);
  kindFormControl = new FormControl('', [
    Validators.required
  ]);
  animalFormControl = new FormControl('', [
    Validators.required
  ]);
  constructor(private store: Store) {}
  ngOnInit() {
    this.store.dispatch([new GetDoctors(), new GetClinics(), new GetLocation()]);
    this.form = new FormGroup({
      age: this.ageFormControl,
      vaccinated: this.vaccinatedFormControl,
      passport: this.passportFormControl,
      kind: this.kindFormControl,
    });
    this.form2 = new FormGroup({
      animal: this.animalFormControl
    });
  }

  searchForSymptoms(){
    this.form.markAllAsTouched();
    this.form2.markAllAsTouched();
    if (this.form.valid){
      this.store.dispatch(new SearchForClinics(this.selectedSymptoms, this.form.value));
      this.form.reset();
    }
    if (this.form2.valid){
      const {name, breed, imgurl, createdAt, id, userid, updatedAt, ...animal} = this.form2.value.animal;
      this.store.dispatch(new SearchForClinics(this.selectedSymptoms, animal));
      this.form2.reset();
    }
  }
  cleanClinics(){
    this.store.dispatch(new SetClinicsToNull());
    this.selectedSymptoms = [];
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  removeSymptom(symptom: string){
    this.selectedSymptoms = this.selectedSymptoms.filter( x => x !== symptom);
  }
}
