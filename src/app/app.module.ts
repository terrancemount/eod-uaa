import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartComponent } from './chart/chart.component';
import { SensorService } from './services/sensor.service';
import { SensorButtonsComponent } from './sensor-buttons/sensor-buttons.component';
import { TimeBarComponent } from './time-bar/time-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ChartDataService } from './services/chart-data.service';
import { ChartDatasetService } from './services/chart-dataset.service';
import { ChartYaxesService } from './services/chart-yaxes.service';
import { ChartConfigService } from './services/chart-config.service';

@NgModule({
  declarations: [
    AppComponent,
    SlideshowComponent,
    DashboardComponent,
    ChartComponent,
    SensorButtonsComponent,
    TimeBarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    SensorService,
    ChartDataService,
    ChartDatasetService,
    ChartYaxesService,
    ChartConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
