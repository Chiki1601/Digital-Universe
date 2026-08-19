import { ChangeDetectionStrategy, Component, ElementRef, input, viewChild } from '@angular/core';
import { MediaItem } from '../../models';
import { MediaCardComponent } from '../media-card/media-card.component';

@Component({
  selector: 'app-content-carousel',
  imports: [MediaCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './content-carousel.component.html',
  styleUrl: './content-carousel.component.scss'
})
export class ContentCarouselComponent {
  readonly title = input('');
  readonly items = input.required<MediaItem[]>();
  readonly compact = input(false);

  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');

  scrollBy(direction: -1 | 1): void {
    this.track().nativeElement.scrollBy({ left: direction * 320, behavior: 'smooth' });
  }
}
