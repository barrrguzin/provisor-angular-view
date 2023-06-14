import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../_services/users.service";
import {Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {User} from "../../../_models/user";
import {MatTableDataSource} from "@angular/material/table";
import {PBXUser} from "../../../_models/pbx-user";

//https://material.angular.io/components/sort/examples

@Component({
  selector: 'app-users-show',
  templateUrl: './users-show.component.html',
  styleUrls: ['./users-show.component.css']
})
export class UsersShowComponent implements OnInit{



  users: User[];
  sortedUsers: User[];
  data: MatTableDataSource<User>;

  constructor(private usersService: UsersService, private _liveAnnouncer: LiveAnnouncer) {

  }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(data => {
        this.users = data
        this.sortedUsers = this.users.slice();
      this.data = new MatTableDataSource(this.sortedUsers);
      }
    );
  }



  sortData(sort: Sort) {
    const data = this.data.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedUsers = data;
      return;
    }

    this.sortedUsers = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'username':
          return this.compare(a.username, b.username, isAsc);
        case 'roles':
          return this.compare(a.roles.length, b.roles.length, isAsc);
        case 'pbxUserName':
          if (a.pbxUser === null) {
            a.pbxUser = {id: 0, mac: "-", number: "-", phoneModel: "-", name: "-"}
          }
          if (b.pbxUser === null) {
            b.pbxUser = {id: 0, mac: "-", number: "-", phoneModel: "-", name: "-"}
          }
          return this.compare(a.pbxUser.name, b.pbxUser.name, isAsc);
        case 'pbxUserNumber':
          if (a.pbxUser === null) {
            a.pbxUser = {id: 0, mac: "-", number: "-", phoneModel: "-", name: "-"}
          }
          if (b.pbxUser === null) {
            b.pbxUser = {id: 0, mac: "-", number: "-", phoneModel: "-", name: "-"}
          }
          return this.compare(a.pbxUser.number, b.pbxUser.number, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
    this.sortedUsers = this.data.filteredData;
    console.log(this.data.filteredData)
  }

}
