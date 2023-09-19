// accept-work-request.component.ts
import { Component, Input } from '@angular/core';
import { WorkRequest } from '../request/work-request.model';
import { WorkService } from '../request/work.service';


@Component({
  selector: 'app-accept-work-request',
  templateUrl: './accept-work-request.component.html',
  styleUrls: ['./accept-work-request.component.css'],
})
export class AcceptWorkRequestComponent {
  @Input() workRequest: WorkRequest; // Input property to pass the work request details
  workRequests: WorkRequest[] = [];
  accepted: boolean = false;

  constructor(private workService: WorkService) {}
  ngOnInit():void{
    this.workService.getAllWorkRequests().subscribe((data) =>{
      this.workRequests = data;
      console.log(this.workRequests);
    });
  }
  acceptRequest() {
    // Add logic to accept the work request and update the worker's schedule
    this.accepted = true;
  }

  declineRequest() {
    // Add logic to decline the work request
  }
}
