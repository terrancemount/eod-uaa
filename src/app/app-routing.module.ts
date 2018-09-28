import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SlideCarouselComponent } from './slide-carousel/slide-carousel.component';
import { ChartComponent } from './chart/chart.component';



/**
 * list of routes for whole website.
 * Todo: break up routes into feature modules.
 */
const routes: Routes = [

  {path:'dashboard', component: ChartComponent},
  {path:'carousel', component: SlideCarouselComponent},
  {path:'', redirectTo: 'dashboard', pathMatch: 'full'},
  {path:'**', redirectTo: 'dashboard'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
