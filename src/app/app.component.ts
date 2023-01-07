import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rockets';

  ngOnInit() {
    if(localStorage.hasOwnProperty('darkMode')) {
      if(JSON.parse(localStorage["darkMode"])) {
        document.body.setAttribute('data-dark-mode', '')
      }
    }
  }
}
