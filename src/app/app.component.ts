import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  constructor(private olympicService: OlympicService) { }

  ngOnInit(): void {
    // Initial Ajax call to populate data in the service. Take(1) ensure automatic unsubscribe.
    this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }
}
