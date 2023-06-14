import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { MenuComponent } from './components/menu/menu.component';
import { ServerMenuComponent } from './components/server-menu/server-menu.component';
import { UsersShowComponent } from './components/users/users-show/users-show.component';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule
} from "@angular/common/http";
import {EnvironmentService} from "../environments/environment.service";
import { LoginComponent } from './components/login/login.component';
import {AuthenticationService} from "./_services/authentication.service";
import { HeaderComponent } from './components/header/header.component';
import { UsersAddComponent } from './components/users/users-add/users-add.component';
import {ErrorInterceptor} from "./_helpers/error.interceptor";
import { UserShowComponent } from './components/users/user-show/user-show.component';
import { AliasesShowComponent } from './components/aliases/aliases-show/aliases-show.component';
import { AliasShowComponent } from './components/aliases/alias-show/alias-show.component';
import { WorkersShowComponent } from './components/workers/workers-show/workers-show.component';
import { WorkerShowComponent } from './components/workers/worker-show/worker-show.component';
import { WorkersAddComponent } from './components/workers/workers-add/workers-add.component';
import { ConfigurationGeneratorComponent } from './components/configuration-generator/configuration-generator.component';
import { NetworkScanComponent } from './components/network-scan/network-scan.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import { DialogComponent } from './components/dialog/dialog.component';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SidenavService} from "./_services/sidenav.service";
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort'
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { CdkColumnDef } from '@angular/cdk/table';
import {MatSelectModule} from "@angular/material/select";


const appRoutes: Routes =[
  { path: '', component: AliasesShowComponent},
  { path: 'login', component: LoginComponent},
  { path: 'users', component: UsersShowComponent},
  { path: 'users/add', component: UsersAddComponent},
  { path: 'users/:id', component: UserShowComponent},
  { path: 'aliases', component: AliasesShowComponent},
  { path: 'aliases/:number', component: AliasShowComponent},
  { path: 'monitor', component: NetworkScanComponent},
  { path: 'workers', component: WorkersShowComponent},
  { path: 'workers/add', component: WorkersAddComponent},
  { path: 'workers/:id', component: WorkerShowComponent},
  { path: 'gencfg', component: ConfigurationGeneratorComponent},
  { path: 'server', component: ServerMenuComponent},
  { path: 'about', component: AboutComponent},
  { path: '**', component: AboutComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    MenuComponent,
    ServerMenuComponent,
    UsersShowComponent,
    LoginComponent,
    HeaderComponent,
    UsersAddComponent,
    UserShowComponent,
    AliasesShowComponent,
    AliasShowComponent,
    WorkersShowComponent,
    WorkerShowComponent,
    WorkersAddComponent,
    ConfigurationGeneratorComponent,
    NetworkScanComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [
    AuthenticationService,
    EnvironmentService,
    HeaderComponent,
    SidenavService,
    CdkColumnDef,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, direction: 'ltr'} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

