import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { OlympicsDataMapper } from 'src/app/core/mappers/olympics-data.mapper';
import { Olympic } from 'src/app/core/models/Olympic';
import { PieChartData } from 'src/app/core/models/PieChartData';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ViewportService } from 'src/app/core/services/viewport.service';

/**
 * Home page component
 * Shows Olympic data in pie chart format with statistics
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[] | null> = of(null);
  public viewPort$: Observable<[number, number]> = of([0,0])
  public pieChartData$!: Observable<PieChartData[] | null>;
  public numberOfCountries$!: Observable<number>;
  public numberOfJOs$!: Observable<number>;

  // ngx-charts configuration
  config = {
    labels: true,
    scheme: "cool",
  }

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private viewPortService: ViewportService,
    private mapper: OlympicsDataMapper
  ) { }

  ngOnInit(): void {
    // The differents observers to use in html with async pipes (auto-unsubscribed)
    this.olympics$ = this.olympicService.getOlympics();
    this.pieChartData$ = this.olympics$.pipe(map(this.mapper.olympicsToPieChartData));
    this.numberOfJOs$ = this.olympics$.pipe(map(this.mapper.getNumberOfJOs));
    this.numberOfCountries$ = this.olympics$.pipe(map(this.mapper.getNumberOfCountries))
    this.viewPort$ = this.viewPortService.getViewportSize();
  }

  /**
   * Navigate back to home page
   */
  onClickCountry(data: PieChartData): void {
    this.router.navigateByUrl(`detail/${data.extra?.id}`);
  }


  /**
   * Format a ngx-charts tooltip to be displayed in a ngx-chart
   * This function have to be linked to the tooltipText attribute of a ngx-chart.
   *
   * @param {{name, value}} data - the title (name), and the value to be printed in the tooltip.
   * @returns {string} The tooltip content to be displayed
   */
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

}
