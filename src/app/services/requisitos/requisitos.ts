import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {SERVER_URL} from "../../../config";

/*
  Generated class for the RequisitosProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RequisitosProvider {

  //Dev host
  host:any = `${SERVER_URL}/ClienteMovilRestFul/api`;
  //token:any = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsZWhlcm5hbmRleiIsImF1ZGllbmNlIjoid2ViIiwiY3JlYXRlZCI6MTUwNTI0NTA1ODE0NSwiZXhwIjoxNTA1ODQ5ODU4fQ.EP7as-WMtYtYP70DFVwsoMP8ziZoDIH67C0rzLlQ1SAHsrRsfj93rgFz7jgnVAvmoW7oU6to24TiINXKxIk48w";
  token:any;

  constructor(public http: HttpClient, 
    public platform: Platform) {
    console.log('Hello RequisitosProvider Provider');
  }

  //REQUISITOS DE TRAMITES ETAX

  getCategorias(token, tipoTramite){
    let url
    if (this.platform.is('cordova')) {
      if(tipoTramite == "ventanilla"){
        url = this.host+"/TramitesVentanillas/ObtenerCategorias";
      }else if(tipoTramite == "expedientes"){
        url = this.host+"/Tramites/ObtenerCategorias";
      }        
    }else{
      if(tipoTramite == "ventanilla"){
        url = "/api/TramitesVentanillas/ObtenerCategorias";
      }else if(tipoTramite == "expedientes"){        
        url = "/api/Tramites/ObtenerCategorias";
      }        
    }

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    //headers.append('App-Version', '1.0.0');
    return this.http.get(url, {headers: headers})
            .map(res => res);
  }

  getSubCategorias(token, tipoTramite, categoria){
    let url
    if (this.platform.is('cordova')) {
        if(tipoTramite == "ventanilla"){
          url = this.host+"/TramitesVentanillas/ObtenerSubCategorias/"+categoria;
        }else if(tipoTramite == "expedientes"){
          url = this.host+"/Tramites/ObtenerSubCategorias/"+categoria;
        }        
    }else{
        if(tipoTramite == "ventanilla"){
          url = "/api/TramitesVentanillas/ObtenerSubCategorias/"+categoria;
        }else if(tipoTramite == "expedientes"){
          url = "/api/Tramites/ObtenerSubCategorias/"+categoria;
        } 
        
    }

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    //headers.append('App-Version', '1.0.0');
    return this.http.get(url, {headers: headers})
            .map(res => res);
  }

  getTramites(token, tipoTramite, categoria, subCategoria){
    let url
    if (this.platform.is('cordova')) {
        if(tipoTramite == "ventanilla"){
          url = this.host+"/TramitesVentanillas/ObtenerTramites/"+categoria+"/"+subCategoria;
        }else if(tipoTramite == "expedientes"){
          url = this.host+"/Tramites/ObtenerTramites/"+categoria+"/"+subCategoria;
        }        
    }else{
        if(tipoTramite == "ventanilla"){
          url = "/api/TramitesVentanillas/ObtenerTramites/"+categoria+"/"+subCategoria;
        }else if(tipoTramite == "expedientes"){
          url = "/api/Tramites/ObtenerTramites/"+categoria+"/"+subCategoria;
        } 
        
    }

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    //headers.append('App-Version', '1.0.0');
    return this.http.get(url, {headers: headers})
            .map(res => res);
  }

  getRequisitos(token, tramite){
    let url
    if (this.platform.is('cordova')) {
      url = this.host+"/Tramites/ObtenerRequisitosTramite/"+tramite;        
    }else{
      url = "/api/Tramites/ObtenerRequisitosTramite/"+tramite;        
    }

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    //headers.append('App-Version', '1.0.0');
    return this.http.get(url, {headers: headers})
            .map(res => res);
  }

  getRequisitosVentanilla(token, tramite){
    let url
    if (this.platform.is('cordova')) {
      url = this.host+"/TramitesVentanillas/ObtenerRequisitosTramite/"+tramite;         
    }else{
      url = "/api/TramitesVentanillas/ObtenerRequisitosTramite/"+tramite;    
    }

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    //headers.append('App-Version', '1.0.0');
    return this.http.get(url, {headers: headers})
            .map(res => res);
  }


  

}
