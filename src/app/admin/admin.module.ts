import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponent } from './admin.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent, AdminHomeComponent, AdminComponent]
})
export class AdminModule { }
