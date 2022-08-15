import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [listServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
