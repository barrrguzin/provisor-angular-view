import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {EnvironmentService} from "../../environments/environment.service";


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private key:string

  constructor(private env: EnvironmentService) {
    this.key = env.getSecret();
  }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, this.encrypt(value));
  }

  public getData(key: string) {
    let data = localStorage.getItem(key)|| "";
    return this.decrypt(data);
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    const data = CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);

    if (data == "") {
      return null;
    } else {
      return data;
    }
  }

}
