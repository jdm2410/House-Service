import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule} from 'angular-star-rating';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ServicesComponent } from './services/services.component';
import { ServiceListComponent } from './services/service-list/service-list.component';
import { ServiceDetailComponent } from './services/service-detail/service-detail.component';
import { ServiceItemComponent } from './services/service-list/service-item/service-item.component';
import { ServiceQuickListComponent } from './services/service-quick-list/service-quick-list.component';
import { listServicesService } from './services/listService.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import { CareerComponent } from './career/career.component';
import { HomeComponent } from './home/home.component';
import { FilterPipe } from './filter.pipe';
import { ServiceStartComponent } from './services/service-start/service-start.component';
import { RequestComponent } from './request/request.component';
import { ContactComponent } from './request/contact/contact.component';
import { ContactservService } from './request/contactserv.service';
import { FooterComponent } from './footer/footer.component';
import { DataStorageService } from './data-storage.service';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat'; 
import { environment } from './firebase-config';
import { UserService } from './user.service';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AcceptWorkRequestComponent } from './accept-work-request/accept-work-request.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ServicesComponent,
    ServiceListComponent,
    ServiceDetailComponent,
    ServiceItemComponent,
    ServiceQuickListComponent,
    AboutComponent,
    CareerComponent,
    HomeComponent,
    FilterPipe,
    ServiceStartComponent,
    RequestComponent,
    ContactComponent,
    FooterComponent,
    ProfileComponent,
    UserProfileComponent,
    LoginComponent,
    RegisterComponent,
    AcceptWorkRequestComponent
    

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StarRatingModule.forRoot(),
    BrowserAnimationsModule,
    CarouselModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
    
  ],
  providers: [
    listServicesService,
    ContactservService,
    DataStorageService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
