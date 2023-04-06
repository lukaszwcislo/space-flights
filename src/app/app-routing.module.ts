import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { FlightsComponent } from './flights/flights.component';
import { EditFlightComponent } from './flights/edit-flight/edit-flight.component';
import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'flights', pathMatch: 'full' },
      { path: 'flights', loadChildren: () => import('./flights/flights.module').then(m => m.FlightsModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
