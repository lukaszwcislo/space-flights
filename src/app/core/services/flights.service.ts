import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Flight } from 'src/app/models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  private API_URL = '/flights';

  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient) { 
      this.http.get('https://api.github.com/users/lukaszwcislo')
        .subscribe(data=>{
          console.log('Gitgub user:', data);
          
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
}
