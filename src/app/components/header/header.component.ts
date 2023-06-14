import { Component } from '@angular/core';
import {AuthenticationService} from "../../_services/authentication.service";
import {SidenavService} from "../../_services/sidenav.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private authenticationService: AuthenticationService, private sidenav: SidenavService) {
  }

  logout() {
    this.authenticationService.logout();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

}
