import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { LineChartData } from 'src/app/core/models/LineChartData';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ViewportService } from 'src/app/core/services/viewport.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  standalone: false,
})
export class DetailComponent implements OnInit {

  public olympic$: Observable<Olympic | null> = of(null);
  public data$: Observable<[LineChartData] | []> = of([])
  public notFound = false;
  public viewPort$: Observable<[number, number]> = of([0,0])

  view: [number, number] = [700, 300];

  // options
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

  mapLineChartData = (olympic: Olympic | null): [LineChartData] | [] => {
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

  countMedals(participations: Participation[]): number {
    return participations.reduce((total:number, participation: Participation)=>total+=participation.medalsCount,0);
  }

  countAthletes(participations: Participation[]): number {
    return participations.reduce((total:number, participation: Participation)=>total+=participation.athleteCount,0);
  }

  ngOnInit(): void {
    const currentId = Number(this.route.snapshot.params['id']);
    this.olympic$ = this.olympicService.getOlympicById(currentId);

    this.data$ = this.olympic$.pipe(
      map(this.mapLineChartData)
    )

    this.viewPort$ = this.viewPortService.getViewportSize();
  }

  onGoBack() {
    this.router.navigateByUrl("");
  }
}

