import {Component, OnInit} from '@angular/core';
import {NetworkScanService} from "../../_services/network-scan.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {Host} from "../../_models/host";
import {Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {PartialAlias} from "../../_models/partial-alias";

@Component({
  selector: 'app-network-scan',
  templateUrl: './network-scan.component.html',
  styleUrls: ['./network-scan.component.css']
})
export class NetworkScanComponent implements OnInit{

  activeHosts: Host[];
  sortedHosts: Host[];
  data: MatTableDataSource<Host>;

  constructor(private networkScanService: NetworkScanService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.networkScanService.startScanAndGetResult().subscribe(data => {
      this.activeHosts = data
      this.sortedHosts = this.activeHosts.slice();
      this.data = new MatTableDataSource(this.sortedHosts);
    })
  }

  reloadConfiguration(ip: string, mac: string, phoneModel: string) {
    this.networkScanService.reloadConfigurationFile(ip, mac, phoneModel).subscribe(response => {
      this.dialog.open(DialogComponent, {
        data: {header: response.status, body: response.body},
      });
    }, error => {
      this.dialog.open(DialogComponent, {
        data: {header: error.status, body: error.body},
      });
    })
  }

  generateConfigurationFile(number: string) {
    this.networkScanService.generateConfigurationFile(number).subscribe(response => {
      this.dialog.open(DialogComponent, {
        data: {header: response.status, body: response.body},
      });
    }, error => {
      this.dialog.open(DialogComponent, {
        data: {header: error.status, body: error.body},
      });
    })
  }



  sortData(sort: Sort) {
    const data = this.data.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedHosts = data;
      return;
    }

    this.sortedHosts = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ipAddress':
          return this.compare(a.ipAddress, b.ipAddress, isAsc);
        case 'macAddress':
          return this.compare(a.macAddress, b.macAddress, isAsc);
        case 'pbxUserName':
          return this.compare(a.name, b.name, isAsc);
        case 'pbxUserNumber':
          return this.compare(a.phoneNumber, b.phoneNumber, isAsc);
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
    this.sortedHosts = this.data.filteredData;
  }

}

