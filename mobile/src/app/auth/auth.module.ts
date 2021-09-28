import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './auth.state';
import { TokenStorageService } from './token-storage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { IonicModule } from '@ionic/angular';
import { authInterceptorProviders } from './auth.interceptor';
import { UserService } from './user-service.service';
import { ProfileComponent } from './profile/profile.component';
export const AUTH_ROUTES: Routes = [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          loginRoute: true,
          title: `Sign In`,
        },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: `Sign Up`,
        },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: `Profile`,
        },
      },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthComponent, ProfileComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(AUTH_ROUTES),
    NgxsModule.forFeature([AuthState]),
    IonicModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [AuthService, TokenStorageService, authInterceptorProviders, UserService]
})
export class AuthModule { }
