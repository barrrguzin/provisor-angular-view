import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EnvironmentService} from "../../environments/environment.service";
import {WebPageService} from "./web-page.service";

@Injectable({
  providedIn: 'root'
})
export class AliasesService extends WebPageService{

  constructor(http: HttpClient, env: EnvironmentService) {
    super(http, env);
  }

  getAliases() {
    return this.http.get<any>(this.backendURL + "/aliases", this.options);
  }

  getAlias(number: string) {
    return this.http.get<any>(this.backendURL + "/aliases/" + number, this.options);
  }
}
