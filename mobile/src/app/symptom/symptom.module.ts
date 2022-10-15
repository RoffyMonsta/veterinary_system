import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSymptomComponent } from './main-symptom/main-symptom.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SymptomService } from './symptom.service';
import { SymptomState } from './symptom.state';
import { IonicSelectableModule } from 'ionic-selectable';
import { ClinicCardComponent } from './clinic-card/clinic-card.component';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

export const SYMPTOM_ROUTES: Routes = [

  {
    path: '',
    component: MainSymptomComponent,
  },
];

@NgModule({
  declarations: [MainSymptomComponent, ClinicCardComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(SYMPTOM_ROUTES),
    NgxsModule.forFeature([SymptomState]),
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    IonicSelectableModule
  ],
  providers:[
    Geolocation,
    SymptomService,
    CallNumber
  ]
})
export class SymptomModule { }
