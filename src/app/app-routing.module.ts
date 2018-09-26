import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SlideCarouselComponent } from './slide-carousel/slide-carousel.component';



/**
 * list of routes for whole website.
 * Todo: break up routes into feature modules.
 */
const routes: Routes = [

  {path:'building', component: DashboardComponent},
  {path:'carousel', component: SlideCarouselComponent},
  {path:'', redirectTo: 'building', pathMatch: 'full'},
  {path:'**', redirectTo: 'building/31'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
