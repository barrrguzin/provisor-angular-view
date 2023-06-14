import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EnvironmentService} from "../../environments/environment.service";
import {WebPageService} from "./web-page.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService extends WebPageService{


  constructor(http: HttpClient, env: EnvironmentService) {
    super(http, env);
  }

  getListOfRoles() {
    return this.http.get<any>(this.backendURL + "/roles", this.options);
  }

  getUsers() {
    return this.http.get<any>(this.backendURL + "/users", this.options);
  }

  getUser(id:string) {
    return this.http.get<any>(this.backendURL + "/users/" + id, this.options);
  }

  addUser(username: string, password: string, pbxUser: any, roles: string[]) {
    return this.http.post<any>(this.backendURL + "/users/add", {username, password, pbxUser: pbxUser, roles}, this.options);
  }

  editUser(user: any) {
    return this.http.patch<any>(this.backendURL + "/users/edit", {id: user.id, username: user.username, password: user.password, pbxUser: {number: user.pbxUser.number}, roles: user.roles}, this.options);
  }

  deleteUser(user: any) {
    return this.http.delete<any>(this.backendURL + "/users/delete/" + user.id, this.options);
  }
}
