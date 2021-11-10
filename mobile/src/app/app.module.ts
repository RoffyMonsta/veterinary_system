import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthState } from './auth/auth.state';
import { AuthService } from './auth/auth.service';
import { UserService } from './auth/user-service.service';
import { AnimalState } from './animals/animal.state';
import { AnimalService } from './animals/animal.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SymptomService } from './symptom/symptom.service';
import { SymptomState } from './symptom/symptom.state';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([AuthState, AnimalState, SymptomState],{ developmentMode: !environment.production }),
    NgxsRouterPluginModule.forRoot(),
    IonicSelectableModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    UserService,
    AnimalService,
    Geolocation,
    SymptomService],
  bootstrap: [AppComponent],
})
export class AppModule {}
