import { Injectable } from '@angular/core';
import { fromEvent, map, Observable, startWith } from 'rxjs';

/**
 * Service to manage viewport size for responsive charts
 * Provides window size dimensions for chart components
 */
@Injectable({
  providedIn: 'root'
})
export class ViewportService {

  private viewPort$!: Observable<[number, number]>;

  constructor() {
    this.viewPort$ = fromEvent(window, 'resize').pipe(
      startWith(this.getViewSize()),
      map(this.getViewSize)
    )
  }

  /**
   * Computes responsive chart dimensions from the current window size.
   *
   * @returns {[number, number]} A tuple of width and height in pixels.
   */
  private getViewSize = (): [number, number] => {
    if (window.innerWidth > window.innerHeight) {
      return [window.innerWidth, window.innerHeight * 0.50]
    }
    return [window.innerWidth, window.innerWidth * 0.75]
  }

  /**
   * Exposes an observable that emits responsive chart dimensions.
   *
   * @returns {Observable<[number, number]>} An observable emitting responsive width and height in pixels.
   */
  public getViewportSize(): Observable<[number, number]> {
    return this.viewPort$;
  }
}
