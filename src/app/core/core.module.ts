import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { SlideInDirective } from './directives/slide-in.directive';


@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    PageNotFoundComponent,
    // SlideInDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule
  ],
  exports: [DashboardComponent, LoginComponent]
})
export class CoreModule { }
