import {Component, OnInit} from '@angular/core';
import {WorkersService} from "../../../_services/workers.service";
import {PBXUser} from "../../../_models/pbx-user";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-workers-show',
  templateUrl: './workers-show.component.html',
  styleUrls: ['./workers-show.component.css']
})
export class WorkersShowComponent implements OnInit{

  workers: PBXUser[];
  sortedWorkers: PBXUser[];
  data: MatTableDataSource<PBXUser>;

  constructor(private workersService: WorkersService, private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnInit(): void {
    this.getWorkers();
  }

  getWorkers() {
    this.workersService.getWorkers().subscribe(data => {
      this.workers = data;
      this.sortedWorkers = this.workers.slice();
      this.data = new MatTableDataSource(this.sortedWorkers);
    })
  }



  sortData(sort: Sort) {
    const data = this.data.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedWorkers = data;
      return;
    }

    this.sortedWorkers = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'number':
          return this.compare(a.number, b.number, isAsc);
        case 'mac':
          return this.compare(a.mac, b.mac, isAsc);
        case 'phoneModel':
          return this.compare(a.phoneModel, b.phoneModel, isAsc);
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
    this.sortedWorkers = this.data.filteredData;
  }

}
