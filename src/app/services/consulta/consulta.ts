import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';
import { Observable } from 'rxjs';
import {SERVER_URL} from "../../../config";

/*
  Generated class for the ConsultaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ConsultaProvider {

  constructor(public http: HttpClient, 
    public platform: Platform,) {
    console.log('Hello ConsultaProvider Provider');

  }

  host:any = `${SERVER_URL}/ClienteMovilRestFul/api`;

  getSolvenciaRTN(rtn){
    let url
    if (this.platform.is('cordova')) {
        url = "http://172.16.25.33:8085/WebService/json/oneway/SolvenciaRtnRequest";
      }else{
        url = "/api/ObtenerSubCategorias/"
    }

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let body = {
        "rtn":rtn
        };
    return this.http.post(url, JSON.stringify(body), {headers: headers})
          
  }

  getValidadorFactura(token, rtn, correlativo, punto, establecimiento, documento, fecha){
    let url
    if (this.platform.is('cordova')) {
        url = this.host + "/Validador/ObtenerValidacion";
      }else{
        url = "/api/ObtenerValidacion"
    }

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    let body = {"Rtn":rtn,"Establecimiento":establecimiento,"PuntoEmision":punto,"TipoDocumento":documento,"Correlativo":correlativo,"Fecha":fecha,"LugarConsulta":"APP"};

    return this.http.post(url, JSON.stringify(body), {headers: headers})
            .timeout(60000)
            // .map(res => res.json())
            .catch((error: any) => 
              { 
                console.log(error);
                console.log(error.status);

                if(error){
                  if(error.name == 'TimeoutError'){
                    return Observable.of({
                        error: 'TimeoutError',
                    });
                  }else{
                    return Observable.of({
                        error: 'ServerError',
                    });
                  }                
                }

                /*
                if(error.status){
                  if (error.status === 500) { 
                    return Observable.of(error.json());
                  }else{
                    
                  }
                }*/
            });

  }

  getValidadorFacturaDummy(token, rtn, correlativo, punto, establecimiento, documento, fecha){
    let url
    if (this.platform.is('cordova')) {
        url = this.host + "/Validador/ObtenerValidacionDummy";
      }else{
        url = "/api/ObtenerValidacionDummy"
    }

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    let body = {"rtn":rtn,"establecimiento":establecimiento,"punto":punto,"documento":documento,"correlativo":correlativo,"fecha":fecha};
    return this.http.post(url, JSON.stringify(body), {headers: headers})
            // .map(res => res.json());

  }

  getProceso(token, rtn, numeroProceso){
    let url
    if (this.platform.is('cordova')) {
        url = this.host + "/WorkFlow/ObtenerProceso";
      }else{
        url = "/api/ObtenerProceso"
    }

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    let body = {"ruc":rtn,"numeroProceso":numeroProceso};
    return this.http.post(url, JSON.stringify(body), {headers: headers})
            // .map(res => res.json());

  }

}
