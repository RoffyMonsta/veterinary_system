import { AnimalPageComponent } from './animal-page/animal-page.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DoctorPageComponent } from './doctor-page/doctor-page.component';
import { StoryPageComponent } from './story-page/story-page.component';
import { VisitPageComponent } from './visit-page/visit-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardDoctorComponent } from './board-doctor/board-doctor.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'pets', component: BoardUserComponent },
  { path: 'pets/:id', component: AnimalPageComponent },
  { path: 'doc', component: BoardDoctorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'visit', component: VisitPageComponent },
  { path: 'visit/:id', component: DoctorPageComponent },
  { path: 'schedule/:id', component: ScheduleComponent },
  { path: 'story', component: StoryPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
