import { AnimalService } from './animal.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalPageComponent } from './animal-page/animal-page.component';
import { AllAnimalsComponent } from './all-animals/all-animals.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { AnimalState } from './animal.state';
import { AddAnimalComponent } from './add-animal/add-animal.component';
import { AnimalCardComponent } from './animal-card/animal-card.component';


export const ANIMALS_ROUTES: Routes = [

  {
    path: 'create',
    component: AddAnimalComponent
  },
  {
    path: ':id',
    component: AnimalPageComponent,
  },
  {
    path: '',
    component: AllAnimalsComponent,
  },
];
@NgModule({
  declarations: [
    AddAnimalComponent,
    AllAnimalsComponent,
    AnimalPageComponent,
    AnimalCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ANIMALS_ROUTES),
    NgxsModule.forFeature([AnimalState]),
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers:[AnimalService]
})
export class AnimalsModule { }
