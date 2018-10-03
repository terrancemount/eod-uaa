import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SlideCarouselComponent } from './slide-carousel/slide-carousel.component';
import { TimeBarComponent } from './time-bar/time-bar.component';
import { ChartComponent } from './chart/chart.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [
    ChartComponent,
    DashboardComponent,
    SlideCarouselComponent,
    TimeBarComponent,
  ]

})
export class DashboardModule { }
