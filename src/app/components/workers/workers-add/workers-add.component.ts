import {Component, OnInit} from '@angular/core';
import {WorkersService} from "../../../_services/workers.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-workers-add',
  templateUrl: './workers-add.component.html',
  styleUrls: ['./workers-add.component.css']
})
export class WorkersAddComponent implements OnInit{

  worker = {id: 0, name: "", number: "", mac: "", phoneModel: ""};
  supportedPhones: string[];

  constructor(private workersService: WorkersService, private router: Router) {
  }

  ngOnInit(): void {
    this.workersService.getListOfSupportedPhones().subscribe(data => {
      this.supportedPhones = data;
      this.worker.phoneModel = this.supportedPhones[0];
    })
  }

  addWorker() {
    this.workersService.addWorker(this.worker).subscribe(data => {
      this.router.navigateByUrl("/workers");
    })
  }

}
