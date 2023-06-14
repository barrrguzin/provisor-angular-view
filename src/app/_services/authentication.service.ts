import { Injectable } from '@angular/core';
import {BehaviorSubject, finalize, map, Observable} from "rxjs";
import {CookieService} from 'ngx-cookie-service';
import {Router} from "@angular/router";
import {HttpBackend, HttpClient, HttpHandler, HttpHeaders} from "@angular/common/http";
import {EnvironmentService} from "../../environments/environment.service";
import {StorageService} from "./storage.service";
import {WebPageService} from "./web-page.service";

@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })
export class AuthenticationService extends WebPageService{

  error: string;

  USER_NAME_SESSION_ATTRIBUTE_NAME: string
  PASSWORD_SESSION_ATTRIBUTE_NAME: string


  constructor(
    http: HttpClient,
    env: EnvironmentService,
    private router: Router,
    private handler: HttpBackend,
    private cookies: CookieService,
    private storage: StorageService
  ) {
    super(http, env);
    this.USER_NAME_SESSION_ATTRIBUTE_NAME = this.env.getUsernameStorageKey();
    this.PASSWORD_SESSION_ATTRIBUTE_NAME = this.env.getPasswordStorageKey();
  }


  authenticate(credentials:any, callback:any) {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    let body:string;
    if (credentials.remember_me == true) {
      body = 'username=' + credentials.username + '&password=' + credentials.password + '&remember-me=remember-me';
    } else {
      body = 'username=' + credentials.username + '&password=' + credentials.password;
    }

    this.http.post<any>( this.backendURL + '/login', body, {headers: headers, withCredentials: true}).subscribe(response => {
      this.registerSuccessfulLogin(credentials);
      return callback && callback();
    },
        error => {
          this.removeSavedData()
      return callback && callback();
    });
  }

  logout() {
    this.http.get(this.backendURL + '/logout').pipe(finalize(() => {
      this.removeSavedData()
      this.router.navigateByUrl('/login');
    })).subscribe();
  }

  registerSuccessfulLogin(credentials:any) {
    this.storage.saveData(this.USER_NAME_SESSION_ATTRIBUTE_NAME, credentials.username)
  }

  removeSavedData() {
    this.cookies.deleteAll();
    this.storage.clearData();
  }

  isUserLoggedIn() {
    const user = this.storage.getData(this.USER_NAME_SESSION_ATTRIBUTE_NAME)

    if (user == null) {
      return false
    } else {
      return true
    }
  }


}
