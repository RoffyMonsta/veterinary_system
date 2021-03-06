
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardDoctorComponent } from './board-doctor/board-doctor.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { VisitPageComponent } from './visit-page/visit-page.component';
import { StoryPageComponent } from './story-page/story-page.component';
import { AnimalCardComponent } from './animal-card/animal-card.component';
import {MatIconModule} from '@angular/material/icon';
import { DoctorCardComponent } from './doctor-card/doctor-card.component';
import { DoctorPageComponent } from './doctor-page/doctor-page.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import {MatSelectModule} from '@angular/material/select';
import { HistoryCardComponent } from './history-card/history-card.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AnimalPageComponent } from './animal-page/animal-page.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    BoardUserComponent,
    BoardDoctorComponent,
    BoardAdminComponent,
    HeaderComponent,
    VisitPageComponent,
    StoryPageComponent,
    AnimalCardComponent,
    DoctorCardComponent,
    DoctorPageComponent,
    ScheduleComponent,
    ScheduleFormComponent,
    HistoryCardComponent,
    AnimalPageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
