import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { ChartDataService } from './services/chart-data.service';
import { ChartDatasetService } from './services/chart-dataset.service';
import { ChartYaxesService } from './services/chart-yaxes.service';
import { ChartConfigService } from './services/chart-config.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ErrorService } from './services/error.service';
import { FormsModule } from '@angular/forms';
import { DashboardModule } from './dashboard/dashboard.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    DashboardModule,
    AppRoutingModule
  ],
  providers: [
    ChartDataService,
    ChartDatasetService,
    ChartYaxesService,
    ChartConfigService,
    ErrorService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
