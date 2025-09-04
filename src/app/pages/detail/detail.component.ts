import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { LineChartData } from 'src/app/core/models/LineChartData';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ViewportService } from 'src/app/core/services/viewport.service';

/**
 * Detail page component for a specific country
 * Shows country Olympic data in line chart format with statistics
 */
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  standalone: false,
})
export class DetailComponent implements OnInit {

  public olympic$: Observable<Olympic | null> = of(null);
  public data$: Observable<LineChartData[]> = of([])
  public viewPort$: Observable<[number, number]> = of([0,0])

  // ngx-charts configuration
  config = {
    legend: false,
    colorScheme: "cool",
    showLabels: true,
    animations: false,
    xAxis: true,
    yAxis: true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    xAxisLabel: 'Dates',
    yAxisLabel: 'Medals',
    autoScale: true
  }

  // colorScheme = {
  //   domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  // };

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private viewPortService: ViewportService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const countryId = Number(this.route.snapshot.params['id']);

    // The differents observers to use in html with async pipes (auto-unsubscribed)
    this.olympic$ = this.olympicService.getOlympicById(countryId);
    this.data$ = this.olympic$.pipe( map(this.mapLineChartData))
    this.viewPort$ = this.viewPortService.getViewportSize();
  }

  /**
   * Convert Olympic[] for a ngx-line-chart
   * This function is meant to be used in an observer map pipe.
   *
   * @param {Olympic|null} olympic - Olympics data to convert
   * @returns {LineChartData[]} - Converted data to use with the LineChart component
   */
  mapLineChartData = (olympic: Olympic | null): LineChartData[] => {
    if (!olympic) return [];
    return [
      {
        name: olympic.country,
        series: olympic.participations.map(
          participation => ({ name: participation.year.toString(), value: participation.medalsCount })
        )
      }
    ]
  }

  /**
   * Count the number of medals from a Participation[]
   * This function is meant to be used in an observer map pipe.
   *
   * @param {Participation[]} participations - Participation data
   * @returns {number} The number of medals
   */
  countMedals(participations: Participation[]): number {
    return participations.reduce((total:number, participation: Participation)=>total+participation.medalsCount,0);
  }

  /**
   * Count the number of athletes from a Participation[]
   * This function is meant to be used in an observer map pipe.
   *
   * @param {Participation[]} participations - Participation data
   * @returns {number} The number of athletes
   */
  countAthletes(participations: Participation[]): number {
    return participations.reduce((total:number, participation: Participation)=>total+participation.athleteCount,0);
  }

  /**
   * Navigate back to the home page
   */
  onGoBack(): void {
    this.router.navigateByUrl("");
  }
}

