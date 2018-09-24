import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { HomeComponent } from './home/home.component';



/**
 * list of routes for whole website.
 * Todo: break up routes into feature modules.
 */
const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'building/:id', component: DashboardComponent},
  {path:'slideshow/:id', component: SlideshowComponent},
  {path:'', redirectTo: 'building/31', pathMatch: 'full'},
  {path:'**', redirectTo: 'building/31'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
