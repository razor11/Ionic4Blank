import {Injectable} from "@angular/core";
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";
import {ReplaySubject, Observable} from "rxjs";
import {Storage} from "@ionic/storage";
import {JwtHelperService} from "@auth0/angular-jwt"
import {SERVER_URL, S, USER_HASH, PASSWORD_HASH} from "../../../config";

declare var CryptoJS;

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/



@Injectable()
export class AuthProvider {

  authUser = new ReplaySubject<any>(1);

  constructor(
    private readonly http: HttpClient,
    private readonly storage: Storage,
    private readonly jwtHelper: JwtHelperService,
    public platform: Platform) {
    console.log('Hello AuthProvider Provider');
  }

  checkLogin() {
    this.storage.get('jwt').then(jwt => {

      if (jwt){
        var jwtExpirationDate = this.jwtHelper.getTokenExpirationDate(jwt);
        console.log("jwt expiration date: " + jwtExpirationDate);
      }

      if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
        //this.authHttp.get(`${SERVER_URL}/authenticate`)
        //  .subscribe(() => this.authUser.next(jwt),
        //    (err) => this.storage.remove('jwt').then(() => this.authUser.next(null)));
        // OR
        console.log("Token exists and hasn't expire");
         this.authUser.next(jwt);
      }
      else {
        console.log("Token doesn't exist or expire");
        this.storage.remove('jwt').then(() => this.authUser.next(null));
      }
    });
  }

  login(): Observable<any> {
    let url
    if (this.platform.is('cordova')) {
        url = `${SERVER_URL}/ClienteMovilRestFul/auth`;
      }else{
        url = "/api/auth/"
    }

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let body = {
        "username": CryptoJS.AES.decrypt(USER_HASH, S).toString(CryptoJS.enc.Utf8),
        "password": CryptoJS.AES.decrypt(PASSWORD_HASH, S).toString(CryptoJS.enc.Utf8)
      };

    return this.http.post(url, JSON.stringify(body), {headers: headers})
      .map((res:any) => res)
      .map(res => this.handleJwtResponse(res.token));
  }

  logout() {
    this.storage.remove('jwt').then(() => this.authUser.next(null));
  }

  private handleJwtResponse(jwt: string) {
    return this.storage.set('jwt', jwt)
      .then(() => this.authUser.next(jwt))
      .then(() => jwt);
  }

}
