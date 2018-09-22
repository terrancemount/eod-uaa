import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartComponent } from './chart/chart.component';
import { SensorService } from './services/sensor.service';
import { SensorButtonsComponent } from './sensor-buttons/sensor-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    SlideshowComponent,
    DashboardComponent,
    ChartComponent,
    SensorButtonsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [SensorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
