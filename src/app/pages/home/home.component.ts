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

  private getViewSize = (): [number, number] => {
    if (window.innerWidth > window.innerHeight) {
      return [window.innerWidth, window.innerHeight * 0.75] as [number, number]
    }
    return [window.innerWidth, window.innerWidth * 0.80] as [number, number]
  }


  public pieChartData$!: Observable<PieChartData[]>;
  public countryCount$!: Observable<number>;
  public numberOfJOs$!: Observable<number>;
  public viewPort$!: Observable<[number, number]>;

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


  constructor(private olympicService: OlympicService) { }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.pieChartData$ = this.olympics$.pipe(map(this.olympicsToPieChartData));
    this.numberOfJOs$ = this.olympics$.pipe(map(this.getNumberOfJOs))
    this.viewPort$ = fromEvent(window, 'resize').pipe(
      startWith(this.getViewSize()),
      map(this.getViewSize)
    )
  }


  onClickCountry(data: any) {
    console.log(`Navigation vers country ${data.extra.id}`)
  }



}
