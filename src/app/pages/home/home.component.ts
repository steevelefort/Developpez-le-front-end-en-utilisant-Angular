import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, count, Observable, of, fromEvent, startWith, shareReplay } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { PieChartData } from 'src/app/core/models/PieChartData';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ViewportService } from 'src/app/core/services/viewport.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[] | null> = of(null);
  public viewPort$: Observable<[number, number]> = of([0,0])

  config = {
    labels: true,
    scheme: "cool",
  }

  private olympicsToPieChartData = (olympics: Olympic[] | null): PieChartData[] => olympics !== null ? olympics.map(
    (item: Olympic): PieChartData => (
      {
        name: item.country,
        value: item.participations.reduce((total, participation) => total + participation.medalsCount, 0),
        extra: { id: item.id }
      }
    )
  ) : []


  private getNumberOfJOs = (olympics: Olympic[] | null): number => {
    if (!olympics) return 0;
    const jos = new Set();
    for (const olympic of olympics) {
      for (const participation of olympic.participations) {
        jos.add(`${participation.city}-${participation.year}`);
      }
    }
    return jos.size;
  }

  public pieChartData$!: Observable<PieChartData[]>;
  public countryCount$!: Observable<number>;
  public numberOfJOs$!: Observable<number>;

  public formatTooltip({ data: { name, value } }: { data: { name: string; value: number }; }): string {
    return `
    <div class="tooltip">
      <div class="label">${name}</div>
      <div class="value">
        <img src="/assets/images/medal.svg" alt=""/> ${value}
      </div>
    </div>
    `;
  }

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private viewPortService: ViewportService
  ) { }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.pieChartData$ = this.olympics$.pipe(map(this.olympicsToPieChartData));
    this.numberOfJOs$ = this.olympics$.pipe(map(this.getNumberOfJOs))
    this.viewPort$ = this.viewPortService.getViewportSize();
  }

  onClickCountry(data: PieChartData) {
    this.router.navigateByUrl(`detail/${data.extra?.id}`);
  }

}
