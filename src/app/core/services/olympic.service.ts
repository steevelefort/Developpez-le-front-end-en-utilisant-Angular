import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, map, take, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

/**
 * Service to manage Olympic data
 * Handles loading, storing and retrieving Olympic information from JSON file
 */
@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[] | null>(null);

  constructor(private http: HttpClient) {}

  /**
   * Load Olympic data from JSON file and push it to BehaviorSubject for components
   * @returns Observable with Olympic data array
   */
  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  /**
   * Get all Olympic data from BehaviorSubject
   * @returns Observable with Olympic data array or null
   */
  getOlympics(): Observable<Olympic[] | null> {
    return this.olympics$.asObservable();
  }

  /**
   * Find and return one Olympic country by its ID
   * @param id - The country ID to search for
   * @returns Observable with Olympic data for the country or null
   */
  getOlympicById(id: number): Observable<Olympic | null> {
    return this.olympics$.pipe(
      filter((value: Olympic[] | null): value is Olympic[] => Array.isArray(value)),
      map((olympic: Olympic[]): Olympic | null => olympic.find((item) => item.id === id) ?? null),
      take(1)
    );
  }
}
