import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../_services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit{

  possibleRoles: [{id: string, name: string}];
  chosenRoles: string[] = [];
  pbxUser = {number: ''}
  userData = {username: '', password: '', pbxUser: this.pbxUser};

  constructor(private usersService: UsersService, private router: Router) {
  }

  ngOnInit(): void {
    this.usersService.getListOfRoles().subscribe(data => {
      this.possibleRoles = data;
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

  addUser() {
    this.usersService.addUser(this.userData.username, this.userData.password, this.userData.pbxUser, this.chosenRoles).subscribe(data => {
      this.router.navigateByUrl('/users');
    }, error => {
      console.log('Cant add user: ' + this.userData.username)
    })
  }

}
