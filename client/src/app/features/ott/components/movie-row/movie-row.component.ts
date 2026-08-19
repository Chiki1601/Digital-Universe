import { ChangeDetectionStrategy, Component, ElementRef, input, output, viewChild } from '@angular/core';
import { ContentSummary } from '../../models/content.model';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movie-row',
  imports: [MovieCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './movie-row.component.html',
  styleUrl: './movie-row.component.scss'
})
export class MovieRowComponent {
  readonly title = input('');
  readonly items = input.required<ContentSummary[]>();
  readonly emptyMessage = input<string | null>(null);
  readonly progressById = input<ReadonlyMap<string, number>>(new Map());
  readonly watchlistIds = input<ReadonlySet<string>>(new Set());

  readonly watchlistToggle = output<string>();

  private readonly track = viewChild<ElementRef<HTMLElement>>('track');

  scrollBy(direction: -1 | 1): void {
    this.track()?.nativeElement.scrollBy({ left: direction * 340, behavior: 'smooth' });
  }
}
