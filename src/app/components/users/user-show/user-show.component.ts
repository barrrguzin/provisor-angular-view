import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../_services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.css']
})
export class UserShowComponent implements OnInit{

  id: string;
  private subscription: Subscription;

  isEditing: boolean = false;
  chosenRoles: string[] = [];
  possibleRoles: [{id: string, name: string}];
  user: {id: string, username: string, password: string, pbxUser: {id: number, name: string, number: string, mac: string, phoneModel: string}, roles: any}

  constructor(private usersService: UsersService, private activateRoute: ActivatedRoute, private router: Router) {
    this.subscription = activateRoute.params.subscribe(params=>this.id=params['id']);
  }

  ngOnInit(): void {
    this.usersService.getUser(this.id).subscribe(data => {
      if (data.pbxUser == null) {
        data.pbxUser = {name: '', number: '', mac: '', phoneModel: ''}
      }
      this.user = data;
    })
    this.usersService.getListOfRoles().subscribe(data => {
      this.possibleRoles = data;
    })
  }

  editData(): void {
    this.isEditing = true;
  }

  editUser(): void {
    this.user.roles = this.chosenRoles;
    this.usersService.editUser(this.user).subscribe(response => {
      this.isEditing = false;
      this.router.navigateByUrl('/users');
    })
  }

  deleteUser(): void {
    this.usersService.deleteUser(this.user).subscribe(response => {
      this.isEditing = false;
      this.router.navigateByUrl('/users');
    })
  }

  changeRoleCheckBox(value: string): void {
    if (this.chosenRoles.includes(value)) {
      this.chosenRoles = this.chosenRoles.filter((item) => item !== value);
    } else {
      this.chosenRoles.push(value);
    }
    console.log(this.chosenRoles);
  }
}
