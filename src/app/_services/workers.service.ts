import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EnvironmentService} from "../../environments/environment.service";
import {WebPageService} from "./web-page.service";

@Injectable({
  providedIn: 'root'
})
export class WorkersService extends WebPageService{

  constructor(http: HttpClient, env: EnvironmentService) {
    super(http, env);
  }

  getWorkers() {
    return this.http.get<any>(this.backendURL + "/workers", this.options)
  }

  getWorker(id: string) {
    return this.http.get<any>(this.backendURL + "/workers/" + id, this.options)
  }

  getListOfSupportedPhones() {
    return this.http.get<any>(this.backendURL + "/supported_phones", this.options)
  }

  editWorker(worker: any) {
    return this.http.patch<any>(this.backendURL + "/workers/edit", worker, this.options)
  }

  deleteWorker(worker: any) {
    return this.http.delete<any>(this.backendURL + "/workers/delete/" + worker.id, this.options)
  }

  addWorker(worker: any) {
    worker.id = null;
    return this.http.post<any>(this.backendURL + "/workers/add", worker, this.options)
  }
}
