import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ServicesComponent } from "./services/services.component";
import { AboutComponent } from "./about/about.component";
import { CareerComponent } from "./career/career.component";
import { HomeComponent } from "./home/home.component";
import { ServiceStartComponent } from "./services/service-start/service-start.component";
import { ServiceDetailComponent } from "./services/service-detail/service-detail.component";
import { ServiceQuickListComponent } from "./services/service-quick-list/service-quick-list.component";
import { RequestComponent } from "./request/request.component";
import { ContactComponent } from "./request/contact/contact.component";
import { ServiceListComponent } from "./services/service-list/service-list.component";
import { ProfileComponent } from "./profile/profile.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AcceptWorkRequestComponent } from "./accept-work-request/accept-work-request.component";

const appRoutes: Routes = [
 { path: '', redirectTo: 'home',pathMatch:"full"},
 { path: 'home', component: HomeComponent, children:[
    { path: '', component: ServiceQuickListComponent },
 ]},
 { path: 'home/:id', redirectTo: 'services/:id', pathMatch:"full"},
 { path: 'services', component: ServicesComponent, children:[
    
    { path: '',component: ServiceStartComponent},
    { path:':id',component:ServiceDetailComponent}
 ]},
 { path: 'about', component: AboutComponent},
 { path: 'career', component: CareerComponent},
 { path:'request', component: RequestComponent, children: [
   { path:'', component: ContactComponent,outlet:'mid'},
 ]},
  { path:'profile',component:ProfileComponent},
  { path:'user-profile', component:UserProfileComponent},
  { path: 'login', component: LoginComponent },
  { path:'register', component:RegisterComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}