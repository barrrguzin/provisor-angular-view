import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {AuthenticationService} from "../_services/authentication.service";
import {EnvironmentService} from "../../environments/environment.service";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private backendURL:string;

  constructor(private env: EnvironmentService, private authentication: AuthenticationService) {
    this.backendURL=env.getBackendURL();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      tap(
        (event) => {
          // if (event instanceof HttpResponse) {} There may be success response handler
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            if (!error.ok && error.url == this.backendURL + '/login') {
              this.authentication.logout();
            }
          }
        }
      )
    )
  }
}
