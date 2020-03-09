import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {SERVER_URL} from "../../../config";



/*
  Generated class for the UbicacionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UbicacionProvider {

   //Dev host
  host:any = `${SERVER_URL}/ClienteMovilRestFul/api`;
  //token:any = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsZWhlcm5hbmRleiIsImF1ZGllbmNlIjoid2ViIiwiY3JlYXRlZCI6MTUwNTI0NTA1ODE0NSwiZXhwIjoxNTA1ODQ5ODU4fQ.EP7as-WMtYtYP70DFVwsoMP8ziZoDIH67C0rzLlQ1SAHsrRsfj93rgFz7jgnVAvmoW7oU6to24TiINXKxIk48w";


  constructor(public http: HttpClient, 
    public platform: Platform) {
    console.log('Hello UbicacionProvider Provider');
  }

  getDepartamentos(token, appVersion){
    //alert(appVersion);
    let url
    if (this.platform.is('cordova')) {
        url = this.host+"/Administracion/ObtenerTodosLosDepartamentosOficinasDisponibles";
      }else{
        url = "/api/ObtenerTodosLosDepartamentosOficinasDisponibles"
    }

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    //headers.append('App-Version', appVersion);
    return this.http.get(url, {headers: headers})
            .map(res => res);
  }

  getUbicaciones(token, appVersion, codigoDepartamento){
    let url
    if (this.platform.is('cordova')) {
        url = this.host+"/Administracion/ObtenerOficinasAtencionDepartamento/"+codigoDepartamento;
      }else{
        url = "/api/ObtenerOficinasAtencionDepartamento/"+codigoDepartamento
    }

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    //headers.append('App-Version', appVersion);
    return this.http.get(url, {headers: headers})
            .map(res => res);
  }

}
