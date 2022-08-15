import { Component, OnInit } from '@angular/core';

import { Service } from '../service.model';
import { listServicesService  } from '../listService.service';

@Component({
  selector: 'app-service-qlist',
  templateUrl: './service-quick-list.component.html',
  styleUrls: ['./service-quick-list.component.css']
})
export class ServiceQuickListComponent implements OnInit {
  filteredStatus = '';
  services!: Service[];
  constructor(private listServicesService: listServicesService,) { 
  }

  ngOnInit(): void {
    this.services = this.listServicesService.addService();
  }

}
