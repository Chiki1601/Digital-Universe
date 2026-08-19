import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  readonly placeholder = input('Search...');
  readonly queryChange = output<string>();

  private readonly input$ = new Subject<string>();

  constructor() {
    this.input$.pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed()).subscribe((value) => {
      this.queryChange.emit(value);
    });
  }

  onInput(value: string): void {
    this.input$.next(value);
  }
}
