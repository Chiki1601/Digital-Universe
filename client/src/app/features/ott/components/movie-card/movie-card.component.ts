import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RatingComponent } from '../../../../platform-engine/components/rating/rating.component';
import { ContentSummary } from '../../models/content.model';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink, RatingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  readonly content = input.required<ContentSummary>();
  readonly progress = input<number | undefined>(undefined);
  readonly inWatchlist = input(false);

  readonly watchlistToggle = output<void>();

  onWatchlistClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.watchlistToggle.emit();
  }
}
