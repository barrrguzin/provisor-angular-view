import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configURL = 'assets/config.json';

  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get<>(this.configURL);
  }
}
