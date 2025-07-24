import { Injectable } from '@angular/core';
import { fromEvent, map, Observable, startWith } from 'rxjs';

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

  private getViewSize = (): [number, number] => {
    if (window.innerWidth > window.innerHeight) {
      return [window.innerWidth, window.innerHeight * 0.75] as [number, number]
    }
    return [window.innerWidth, window.innerWidth * 0.80] as [number, number]
  }

  public getViewportSize() {
    return this.viewPort$;
  }
}
