import { Component, OnInit } from '@angular/core';

import { Service } from './service.model';
import { listServicesService } from './listService.service';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  providers: [listServicesService ]
})
export class ServicesComponent implements OnInit {
  selectedService: Service;
  services: Service[];
  
  constructor(private listServicesService: listServicesService, private dataStorageService: DataStorageService) { }

  


  ngOnInit(): void {
    this.listServicesService.serviceSelected
        .subscribe(
          (service: Service) =>{
            this.selectedService = service;
          }
        )

  }

}
