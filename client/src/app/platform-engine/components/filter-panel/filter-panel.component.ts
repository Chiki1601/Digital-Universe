import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-filter-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.scss'
})
export class FilterPanelComponent {
  readonly label = input('All');
  readonly options = input.required<string[]>();
  readonly selected = input<string | null>(null);
  readonly selectionChange = output<string | null>();
}
