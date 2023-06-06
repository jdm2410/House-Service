import { Component, OnInit } from '@angular/core';

import { Service } from './service.model';
import { listServicesService } from './listService.service';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {

  
  constructor() { }

  


  ngOnInit(): void {
  

  }

}
