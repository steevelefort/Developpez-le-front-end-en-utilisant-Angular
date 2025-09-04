import { Component, Input } from '@angular/core';

/**
 * Tag component to display label and value pairs
 * Shows statistics in a styled format
 */
@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
  standalone: false
})
export class TagComponent {
  @Input() label: string | undefined | null = "";
  @Input() value: number | undefined | null = 0;
}
