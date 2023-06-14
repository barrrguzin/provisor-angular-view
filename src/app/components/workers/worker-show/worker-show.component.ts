import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {WorkersService} from "../../../_services/workers.service";

@Component({
  selector: 'app-worker-show',
  templateUrl: './worker-show.component.html',
  styleUrls: ['./worker-show.component.css']
})
export class WorkerShowComponent implements OnInit{

  id: string;
  private subscription: Subscription;

  isEditing: boolean = false;
  supportedPhones: string[];
  worker: any;


  constructor(private workersService: WorkersService, private activateRoute: ActivatedRoute, private router: Router) {
    this.subscription = activateRoute.params.subscribe(params=>this.id=params['id']);
  }

  ngOnInit(): void {
    this.workersService.getWorker(this.id).subscribe(data => {
      this.worker = data;
    })
    this.workersService.getListOfSupportedPhones().subscribe(data => {
      this.supportedPhones = data;
    })
  }

  editData(): void {
    this.isEditing = true;
  }

  editWorker() {
    this.workersService.editWorker(this.worker).subscribe(data => {
      this.router.navigateByUrl("/workers");
    });

  }

  deleteWorker() {
    this.workersService.deleteWorker(this.worker).subscribe(data => {
      this.router.navigateByUrl("/workers");
    });
  }

}
