import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './auth.state';
import { TokenStorageService } from './token-storage.service';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
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
    ],
  },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(AUTH_ROUTES),
    NgxsModule.forFeature([AuthState]),
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule
  ],
  providers: [AuthService, TokenStorageService]
})
export class AuthModule { }
