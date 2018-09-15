import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartComponent } from './dashboard/chart/chart.component';
import { SensorService } from './services/sensor.service';

@NgModule({
  declarations: [
    AppComponent,
    SlideshowComponent,
    DashboardComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [SensorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
