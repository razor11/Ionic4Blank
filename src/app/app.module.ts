import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, IonApp } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { JwtModule } from "@auth0/angular-jwt";

import { HttpClientModule, HttpClient, HttpRequest } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';





import { RequisitosProvider } from './services/requisitos/requisitos';
import { UbicacionProvider } from './services/ubicacion/ubicacion';

import { Storage, IonicStorageModule } from '@ionic/storage';
import { AuthProvider } from './services/auth/auth';

import { CustomFormsModule } from 'ng2-validation';
import { AvisosProvider } from './services/avisos/avisos';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




export function tokenGetter() {
  return localStorage.getItem("access_token");
}
 


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports:
    [
      BrowserModule,
      CustomFormsModule,
      IonicModule.forRoot(),
      IonicStorageModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          whitelistedDomains: ["localhost"],
          blacklistedRoutes: ["localhost/examplebadroute/"]
        }
      }),
      BrowserAnimationsModule],


  providers: [
    ErrorHandler,
    StatusBar,
    RequisitosProvider,
    UbicacionProvider,
    AvisosProvider,
    AuthProvider,
    SplashScreen
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
