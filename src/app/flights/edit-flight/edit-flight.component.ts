import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { FlightsService } from 'src/app/core/services/flights.service';
import { Flight } from 'src/app/models/flight.model';
import { FlightFormComponent } from '../flight-form/flight-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.scss']
})
export class EditFlightComponent implements AfterViewInit{
  @ViewChild('flightForm') flightForm!: FlightFormComponent;
  @ViewChild('confirmDeletion') confirmDeletion!: any;

  constructor(
    private flightsService: FlightsService,
    private route: ActivatedRoute,
    private toasts: MatSnackBar,
    private router: Router,
    private dialog: MatDialog) { }

  public flight!: Flight;

  private loadFlight() {
    const key = this.route.snapshot.params['key'];
    this.flightsService.getFlight(key)
      .pipe(
        tap(flight => this.flightForm.setFlight(flight))
      )
      .subscribe(flight => {
        this.flight = flight 
      })
  }

  public editFlight() {
    this.flightsService.editFlight(this.flight.key, this.flightForm.form.value)
      .then(this.onEditSuccess.bind(this))
      .catch(this.onFailure.bind(this))
  }

  private onEditSuccess() {
    this.router.navigate(['/dashboard/flights'])
    this.toasts.open(
      'Flight has been successfully saved',
      '',
      { panelClass: ['toast--success'] }
      );
  }

  private onRemoveSuccess() {
    this.router.navigate(['/dashboard/flights'])
    this.toasts.open(
      'Flight has been successfully removed',
      '',
      { panelClass: ['toast--success'] }
      );
  }

  private onFailure(error: Error) {
    this.toasts.open(
      error.message,
      '',
      { panelClass: ['toast--error'] }
      );
  }

  public removeFlight() {
    this.flightsService.removeFlight(this.flight.key)
      .then(this.onRemoveSuccess.bind(this), this.onFailure.bind(this))
  }

  openModalToRemoveFlight() {
    this.dialog.open(this.confirmDeletion, {
      disableClose: false,
      width: 'unset'
    });
  }

  ngAfterViewInit(): void {
    this.loadFlight()
  }

}
