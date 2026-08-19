import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './error-state.component.html',
  styleUrl: './error-state.component.scss'
})
export class ErrorStateComponent {
  readonly title = input('Something went wrong');
  readonly message = input('Please try again in a moment.');
  readonly retryable = input(true);

  readonly retry = output<void>();
}
