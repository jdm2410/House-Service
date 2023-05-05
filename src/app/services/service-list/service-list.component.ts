import { Component, OnInit } from '@angular/core';

import { Service } from '../service.model';
import { listServicesService  } from '../listService.service';


@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  services: Service[];
  pickCategory = "";
  constructor(private listServicesService: listServicesService) { 
  }

  ngOnInit(): void {
    this.services = this.listServicesService.addService(); 
    console.log(this.services)
  }

}
