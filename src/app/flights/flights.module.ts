import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsComponent } from './flights.component';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { MaterialModule } from '../material/material.module';
import { NewFlightComponent } from './new-flight/new-flight.component';
import { FlightFormComponent } from './flight-form/flight-form.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { EditFlightComponent } from './edit-flight/edit-flight.component';

@NgModule({
  declarations: [
    FlightsComponent,
    FlightCardComponent,
    NewFlightComponent,
    FlightFormComponent,
    FlightDetailsComponent,
    EditFlightComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FlightsComponent
  ]
})
export class FlightsModule { }
