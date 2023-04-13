import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { Flight } from 'src/app/models/flight.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  private uid!: string;
  public API_URL = `/users/${localStorage["loggedUser"] ? JSON.parse(localStorage["loggedUser"]).uid : ''}/flights`;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService) {
      this.authService.updateUserData$
        .subscribe(data => {
          this.uid = data.uid;
        })
    }

  public getFlights(): Observable<Flight[]> {
    return this.db.list<Flight[]>(this.API_URL).snapshotChanges()
      .pipe(
        map((response => response.map(flight => this.assignKey(flight))))
      )
  }

  private assignKey(flight: any) {
    return {...flight.payload.val(), key: flight.key}
  }

  public addFlight(flight: Flight): Promise<any> {
    return Promise.resolve(this.db.list<Flight>(this.API_URL).push(flight));
  }

  public removeFlight(key: string) {
    return this.db.object<Flight>(`${this.API_URL}/${key}`).remove();
  }

  public getFlight(key: string) : Observable<Flight> {
    return this.db.object<Flight>(`${this.API_URL}/${key}`)
      .snapshotChanges()
      .pipe(
        map(flight => this.assignKey(flight))
      )
  }

  public editFlight(key: string, flight: Flight) {
   return this.db.object<Flight>(`${this.API_URL}/${key}`).update(flight);
  }
}
