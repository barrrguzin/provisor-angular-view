import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EnvironmentService} from "../../environments/environment.service";

@Injectable({
  providedIn: 'root'
})
export class WebPageService {

  protected backendURL: string;
  protected options = {headers: new HttpHeaders({'Content-Type':'application/json'}), withCredentials: true};

  constructor(protected http: HttpClient, protected env: EnvironmentService) {
    this.backendURL = env.getBackendURL();
  }
}
