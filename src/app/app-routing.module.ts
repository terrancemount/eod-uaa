import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SlideCarouselComponent } from './slide-carousel/slide-carousel.component';
import { ImageListComponent } from './image-list/image-list.component';



/**
 * list of routes for whole website.
 * Todo: break up routes into feature modules.
 */
const routes: Routes = [

  {path:'dashboard', component: DashboardComponent},
  {path:'carousel', component: SlideCarouselComponent},
  {path:'admin', component: ImageListComponent},
  {path:'', redirectTo: 'dashboard', pathMatch: 'full'},
  {path:'**', redirectTo: 'dashboard'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
