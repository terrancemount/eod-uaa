import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartComponent } from './chart/chart.component';
import { SensorButtonsComponent } from './sensor-buttons/sensor-buttons.component';
import { TimeBarComponent } from './time-bar/time-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { ChartDataService } from './services/chart-data.service';
import { ChartDatasetService } from './services/chart-dataset.service';
import { ChartYaxesService } from './services/chart-yaxes.service';
import { ChartConfigService } from './services/chart-config.service';
import { BuildingService } from './services/building.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SlideCarouselComponent } from './slide-carousel/slide-carousel.component';
import { ErrorService } from './services/error.service';
import { ImageService } from './services/image.service';
import { ImageListComponent } from './image-list/image-list.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ChartComponent,
    SensorButtonsComponent,
    TimeBarComponent,
    SlideCarouselComponent,
    ImageListComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    ChartDataService,
    ChartDatasetService,
    ChartYaxesService,
    ChartConfigService,
    BuildingService,
    ErrorService,
    ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
