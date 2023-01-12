import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightsService } from '../core/services/flights.service';
import { Flight } from '../models/flight.model';
import { MatDialog } from '@angular/material/dialog';
import { NewFlightComponent } from './new-flight/new-flight.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent {

  constructor(
    private dialog: MatDialog,
    private flightsService: FlightsService
    ) {}

  public flights$: Observable<Flight[]> = this.flightsService.getFlights();

  public openNewFlightModal() {
    this.dialog.open(NewFlightComponent);
  }

  public showDetails(flight: any) {
    this.dialog.open(FlightDetailsComponent, { data: flight })
  }
}
