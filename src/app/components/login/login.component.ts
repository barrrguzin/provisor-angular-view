import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../_services/authentication.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials = {username: '', password: '', remember_me: ''};
  error:string;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  login() {
    this.authenticationService.authenticate(this.credentials, () => {
      this.router.navigateByUrl("/");
      window.location.href = "/";
    });
  }

}
