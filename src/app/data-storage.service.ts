import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { listServicesService } from "./services/listService.service";
import { Service } from "./services/service.model";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})

export class DataStorageService{
    
    private services: Service[]=[];

    constructor(private http: HttpClient, private serviceService: listServicesService){}
    storeServices(){
        const services = this.serviceService.addService();
        this.http.put('https://ng-house-service-default-rtdb.europe-west1.firebasedatabase.app/serv.json',services).subscribe(
            response => {
                console.log(response);
            }
        );
    }
    fetchServices(){
        this.http.get<Service[]>('https://ng-house-service-default-rtdb.europe-west1.firebasedatabase.app/serv.json').subscribe(
            services => {
                console.log(services);
                this.services = services;
                this.serviceService.setServices(services);
            }
        );
    }

    getServiceById(id: number): Service{
        return this.services[id];
        
    }
}