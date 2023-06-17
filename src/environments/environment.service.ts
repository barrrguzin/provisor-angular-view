import {Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  private readonly environment: any;


  // We need @Optional to be able start app without providing environment file
  //constructor(@Optional() @Inject(ENVIRONMENT) environment: any) {
  constructor() {
    this.environment = environment !== null ? environment : {};
  }

  private getValue(key: string, defaultValue?: any): any {
    return this.environment[key] || defaultValue;
  }

  getBackendURL(): string {
    //return this.environment.apiUrl || 'https://sip.int.ptkom.ru:8443';
    return this.environment.apiUrl || 'http://localhost:8080';
  }

  getUsernameStorageKey(): string {
    return this.environment['usernameStorageKey'] || 'username';
  }

  getPasswordStorageKey(): string {
    return this.environment['passwordStorageKey'] || 'password';
  }

  getSecret(): string {
    return this.environment['secret'] || 'asgasdgasdg2235235!$)(!&*%a';
  }
}
