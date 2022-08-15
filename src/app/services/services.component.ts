import { Component, OnInit } from '@angular/core';

import { Service } from './service.model';
import { listServicesService } from './listService.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  providers: [listServicesService ]
})
export class ServicesComponent implements OnInit {
  selectedService!: Service;
  
  constructor(private listServicesService: listServicesService) { }

  ngOnInit(): void {
    this.listServicesService.serviceSelected
        .subscribe(
          (service: Service) =>{
            this.selectedService = service;
          }
        )
  }

}
