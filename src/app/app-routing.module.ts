import { StoryPageComponent } from './story-page/story-page.component';
import { VisitPageComponent } from './visit-page/visit-page.component';
import { AppComponent } from './../../../ngtest/src/app/app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardDoctorComponent } from './board-doctor/board-doctor.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'pets', component: BoardUserComponent },
  { path: 'doc', component: BoardDoctorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'visit', component: VisitPageComponent },
  { path: 'story', component: StoryPageComponent },
  { path: '', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
