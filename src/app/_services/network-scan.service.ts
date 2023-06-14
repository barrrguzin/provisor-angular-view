import { Injectable } from '@angular/core';
import {WebPageService} from "./web-page.service";
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../../environments/environment.service";

@Injectable({
  providedIn: 'root'
})
export class NetworkScanService extends WebPageService{

  constructor(http: HttpClient, env: EnvironmentService) {
    super(http, env);
  }

  startScanAndGetResult() {
    return this.http.get<any>(this.backendURL + "/monitor", this.options);
  }

  reloadConfigurationFile(ip: string, mac: string, phoneModel: string) {
    return this.http.patch<any>(this.backendURL + "/reload", {ip: ip, mac: mac, model: phoneModel}, this.options)
  }

  generateConfigurationFile(number: string) {
    return this.http.post<any>(this.backendURL + "/config/make", number, this.options)
  }
}
