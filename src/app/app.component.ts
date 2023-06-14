import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {EnvironmentService} from "../environments/environment.service";
import {AuthenticationService} from "./_services/authentication.service";
import {SidenavService} from "./_services/sidenav.service";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  backendURL: string;

  @ViewChild('sidenav') public sidenav: MatSidenav;
  constructor(private authenticationService: AuthenticationService, private http: HttpClient, private router: Router, private environment: EnvironmentService, private sidenavService: SidenavService) {
    this.backendURL = environment.getBackendURL();
  }


  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
    this.sidenavService.open();
    console.log("ok")
  }


  authenticated() {
    return this.authenticationService.isUserLoggedIn()
  }


}
