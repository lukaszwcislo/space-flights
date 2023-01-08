import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FlightFormComponent } from '../flight-form/flight-form.component';

@Component({
  selector: 'app-new-flight',
  templateUrl: './new-flight.component.html',
  styleUrls: ['./new-flight.component.scss']
})
export class NewFlightComponent {
  @ViewChild('flightForm') flightForm!: FlightFormComponent

  constructor(private dialogRef: MatDialogRef<NewFlightComponent>) {
    
  }

}
