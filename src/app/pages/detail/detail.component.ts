import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { OlympicsDataMapper } from 'src/app/core/mappers/olympics-data.mapper';
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

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private viewPortService: ViewportService,
    private router: Router,
    public mapper: OlympicsDataMapper
  ) { }

  ngOnInit(): void {
    const countryId = Number(this.route.snapshot.params['id']);

    // The differents observers to use in html with async pipes (auto-unsubscribed)
    this.olympic$ = this.olympicService.getOlympicById(countryId);
    this.data$ = this.olympic$.pipe( map(this.mapper.mapLineChartData))
    this.viewPort$ = this.viewPortService.getViewportSize();
  }


  /**
   * Navigate back to the home page
   */
  onGoBack(): void {
    this.router.navigateByUrl("");
  }
}

