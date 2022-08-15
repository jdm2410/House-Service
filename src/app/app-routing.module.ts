import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ServicesComponent } from "./services/services.component";
import { AboutComponent } from "./about/about.component";
import { CareerComponent } from "./career/career.component";
import { ServiceListComponent } from "./services/service-list/service-list.component";
import { HomeComponent } from "./home/home.component";
import { ServiceStartComponent } from "./services/service-start/service-start.component";
import { ServiceDetailComponent } from "./services/service-detail/service-detail.component";

const appRoutes: Routes = [
 { path: '', redirectTo: 'app',pathMatch:"full"},
 { path: 'home', component: HomeComponent},
 { path: 'services', component: ServicesComponent, children:[
    { path: '',component: ServiceStartComponent},
    { path:':id',component:ServiceDetailComponent}
 ]},
 { path: 'services/service-list', component: ServiceListComponent},
 { path: 'about', component: AboutComponent},
 { path: 'career', component: CareerComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}