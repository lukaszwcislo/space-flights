import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, take } from 'rxjs';


@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private router: Router
  ) {}

  public counter = 5;

  public countingDown() {
    const numbers$ = interval(1000);
    numbers$
      .pipe(
        take(5)
      )
      .subscribe(() => {
        --this.counter;
        this.counter === 0 && this.router.navigate(['./dashboard']);
      })
  }

  ngOnInit(): void {
    this.countingDown();
  }  

}
