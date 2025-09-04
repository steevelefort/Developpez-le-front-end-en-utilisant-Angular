import { Injectable } from "@angular/core";
import { Olympic } from "../models/Olympic";
import { PieChartData } from "../models/PieChartData";
import { Participation } from "../models/Participation";
import { LineChartData } from "../models/LineChartData";

@Injectable({
  providedIn: 'root'
})
export class OlympicsDataMapper {


  /**
   * Convert Olympic[] data to PieChartData[]
   * This function is meant to be used in an observer map pipe.
   *
   * @param {Olympic[]|null} olympics - Olympics data to convert
   * @returns {PieChartData[]|null} - Converted data to use with the PieChart component
   */
  public olympicsToPieChartData = (olympics: Olympic[] | null): PieChartData[] | null => olympics !== null ? olympics.map(
    (item: Olympic): PieChartData => (
      {
        name: item.country,
        value: item.participations.reduce((total, participation) => total + participation.medalsCount, 0),
        extra: { id: item.id }
      }
    )
  ) : null;

  /**
   * Count the number of JOs from an Olympic[]
   * This function is meant to be used in an observer map pipe.
   *
   * @param {Olympic[]|null} olympics - Olympics data
   * @returns {number} The number of JOs found
   */
  public getNumberOfJOs = (olympics: Olympic[] | null): number => {
    if (!olympics) return 0;
    const jos = new Set();
    for (const olympic of olympics) {
      for (const participation of olympic.participations) {
        jos.add(`${participation.city}-${participation.year}`);
      }
    }
    return jos.size;
  }

  /**
   * Count the number of countries from an Olympic[]
   * This function is meant to be used in an observer map pipe.
   *
   * @param {Olympic[]|null} olympics - Olympics data
   * @returns {number} The number of countries found
   */
  public getNumberOfCountries = (olympics: Olympic[] | null): number => olympics ? olympics.length : 0;


  /**
   * Convert Olympic[] for a ngx-line-chart
   * This function is meant to be used in an observer map pipe.
   *
   * @param {Olympic|null} olympic - Olympics data to convert
   * @returns {LineChartData[]} - Converted data to use with the LineChart component
   */
  public mapLineChartData = (olympic: Olympic | null): LineChartData[] => {
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
  public countMedals(participations: Participation[]): number {
    return participations.reduce((total:number, participation: Participation)=>total+participation.medalsCount,0);
  }

  /**
   * Count the number of athletes from a Participation[]
   * This function is meant to be used in an observer map pipe.
   *
   * @param {Participation[]} participations - Participation data
   * @returns {number} The number of athletes
   */
  public countAthletes(participations: Participation[]): number {
    return participations.reduce((total:number, participation: Participation)=>total+participation.athleteCount,0);
  }

}
