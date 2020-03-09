import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs';
import {SERVER_URL, ONSESIGNAL_URL} from "../../../config";

/*
  Generated class for the AvisosProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/


@Injectable()
export class AvisosProvider {

  //Dev host
  notificacionesEndpoint:any = `${ONSESIGNAL_URL}/api/v1/notifications`;

  constructor(public http: HttpClient, 
    public platform: Platform) {
    console.log('Hello AvisosProvider Provider');
  }

  //AVISOS DE ONESIGNAL
  getAvisos(){
    let url
    if (this.platform.is('cordova')) {
      url = this.notificacionesEndpoint+"?app_id=cf0d0456-8468-48e8-854e-efe27117fbed&limit=10";       
    }else{
      url = "/onesignal/api"+"?app_id=cf0d0456-8468-48e8-854e-efe27117fbed&limit=10";       
    }

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic MzM5ZDk1ZWUtNGJkOC00N2U0LTg5NDQtNmY5NTEzMDhkMjFj');
    //headers.append('App-Version', '1.0.0');
    return this.http.get(url+' &rnd='+Math.random(), {headers: headers})
          
            .timeout(60000)
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
            })
            ;
  }

}
