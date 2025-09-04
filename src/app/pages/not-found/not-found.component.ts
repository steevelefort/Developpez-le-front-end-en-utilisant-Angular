import { Component, OnInit } from '@angular/core';

/**
 * 404 Not Found page component
 * Displays error message when user visits invalid route
 */
@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    standalone: false
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
