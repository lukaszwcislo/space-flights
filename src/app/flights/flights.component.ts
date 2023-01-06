import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../core/services/flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {

  constructor(private flightsService: FlightsService  ) {
  }

  test: any;

  ngOnInit(): void {
    this.flightsService.getFlights()
      .subscribe(flights =>{
        console.log('flights', flights);
        this.test = flights;
      })
  }

}
