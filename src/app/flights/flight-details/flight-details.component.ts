import { Component, Inject } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent {
  public flight!: Flight

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<FlightDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Flight
  ) {
    this.flight = data;
  }

  public closeModal() {
    this.dialogRef.close();
  }

  public goToEditFlight() {
    this.closeModal();
    this.router.navigate(['/dashboard/flights', this.flight.key])
  }

}
