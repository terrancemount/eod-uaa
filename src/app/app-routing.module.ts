import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



/**
 * list of routes for whole website.
 * Todo: break up routes into feature modules.
 */
const routes: Routes = [

  {path:'', redirectTo: 'carousel', pathMatch: 'full'},
  {path:'**', redirectTo: 'carousel'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
