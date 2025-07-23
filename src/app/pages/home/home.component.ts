import { Component, OnInit } from '@angular/core';
import { map, count, Observable, of, fromEvent, startWith, shareReplay } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { PieChartData } from 'src/app/core/models/PieChartData';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[] | null> = of(null);

  // view: [number, number] = [700, 400];

  config = {
    labels: true,
    view: [700, 400] as [number, number]
  }

  private olympicsToPieChartData = (olympics: Olympic[] | null): PieChartData[] => olympics !== null ? olympics.map(
    (item: Olympic): PieChartData => (
      {
        name: item.country,
        value: item.participations.reduce((total, participation) => total + participation.medalsCount, 0)
      }
    )
  ) : []

  public pieChartData$!: Observable<PieChartData[]>;
  public countryCount$!: Observable<number>;
  public numberOfJOs$!: Observable<number>;

  public viewPort$!: Observable<[number, number]>;

  constructor(private olympicService: OlympicService) { }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.pieChartData$ = this.olympics$.pipe(map(this.olympicsToPieChartData));
    this.numberOfJOs$ = this.olympics$.pipe(map((olympics: Olympic[] | null): number => {
      if (!olympics) return 0;
      const jos = new Set();
      for (const olympic of olympics) {
        for (const participation of olympic.participations) {
          jos.add(`${participation.city}-${participation.year}`);
        }
      }
      return jos.size;
    }))
    this.viewPort$ = fromEvent(window, 'resize').pipe(
      startWith([window.innerWidth, window.innerHeight] as [number, number]),
      map(() => ([window.innerWidth, window.innerHeight] as [number, number])),
    )
  }
}
