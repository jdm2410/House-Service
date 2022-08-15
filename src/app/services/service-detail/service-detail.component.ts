import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { listServicesService } from '../listService.service';
import { Service } from '../service.model';



@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  service!: Service;
  id!:number;


  constructor(private listService: listServicesService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params)=>{
          this.id = +params ['id'];
          this.service = this.listService.getService(this.id);
        }
      )
  }

}
