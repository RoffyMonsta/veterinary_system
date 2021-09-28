import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Login } from 'src/app/auth/auth.actions';
import { AddAnimal } from '../animal.actions';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAnimalComponent implements OnInit {

  form: FormGroup;
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(30)
  ]);
  imgUrlFormControl = new FormControl('', [
    Validators.maxLength(100)
  ]);
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
  breedFormControl = new FormControl('', [
    Validators.maxLength(30)
  ]);
  constructor(private store: Store, private navCtrl: NavController) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: this.nameFormControl,
      imgurl: this.imgUrlFormControl,
      age: this.ageFormControl,
      vaccinated: this.vaccinatedFormControl,
      passport: this.passportFormControl,
      kind: this.kindFormControl,
      breed: this.breedFormControl
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.store.dispatch(new AddAnimal(this.form.value));
      this.navCtrl.back();
    }

  }

}
