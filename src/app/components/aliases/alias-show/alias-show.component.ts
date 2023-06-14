import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../_services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AliasesService} from "../../../_services/aliases.service";

@Component({
  selector: 'app-alias-show',
  templateUrl: './alias-show.component.html',
  styleUrls: ['./alias-show.component.css']
})
export class AliasShowComponent implements OnInit{

  number: string;
  private subscription: Subscription;

  alias: any;

  constructor(private aliasesService: AliasesService, private activateRoute: ActivatedRoute) {
    this.subscription = activateRoute.params.subscribe(params=>this.number=params['number']);
  }

  ngOnInit(): void {
    this.getAlias();
  }

  getAlias(): void {
    this.aliasesService.getAlias(this.number).subscribe(data => {
      this.alias = data;
    })
  }

}
