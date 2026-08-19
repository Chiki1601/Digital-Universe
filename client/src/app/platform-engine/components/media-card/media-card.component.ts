import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MediaItem } from '../../models';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-media-card',
  imports: [RatingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './media-card.component.html',
  styleUrl: './media-card.component.scss'
})
export class MediaCardComponent {
  readonly item = input.required<MediaItem>();
  readonly compact = input(false);
}
