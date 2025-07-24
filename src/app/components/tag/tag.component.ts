import { Component, Input } from '@angular/core';

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
