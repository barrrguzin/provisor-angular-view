import { Injectable } from '@angular/core';
import {WebPageService} from "./web-page.service";
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../../environments/environment.service";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationFileGeneratorService extends WebPageService{

  constructor(http: HttpClient, env: EnvironmentService) {
    super(http, env);
  }

  generateConfigurationByNumber(number: number) {
    return this.http.post<any>(this.backendURL + "/config/make", number, this.options)
  }

}
