import {Component, OnInit} from '@angular/core';
import {AliasesService} from "../../../_services/aliases.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {Sort} from "@angular/material/sort";
import {PartialAlias} from "../../../_models/partial-alias";
import {MatTableDataSource} from "@angular/material/table";
import {PBXUser} from "../../../_models/pbx-user";

@Component({
  selector: 'app-aliases-show',
  templateUrl: './aliases-show.component.html',
  styleUrls: ['./aliases-show.component.css']
})
export class AliasesShowComponent implements OnInit{

  aliases: PartialAlias[];
  sortedAliases: PartialAlias[];
  data: MatTableDataSource<PartialAlias>;

  constructor(private aliasesService: AliasesService, private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnInit(): void {
    this.getAliasesList()
  }

  getAliasesList(): void{
    this.aliasesService.getAliases().subscribe(data => {
      this.aliases = data
      this.sortedAliases = this.aliases.slice();
      this.data = new MatTableDataSource(this.sortedAliases);
    })
}


  sortData(sort: Sort) {
    const data = this.data.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedAliases = data;
      return;
    }

    this.sortedAliases = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.displayName, b.displayName, isAsc);
        case 'number':
          return this.compare(a.address, b.address, isAsc);
        case 'group':
          return this.compare(a.interfaceGroup, b.interfaceGroup, isAsc);
        case 'register':
          return this.compare(a.binded, b.binded, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
    this.sortedAliases = this.data.filteredData;
  }

}
