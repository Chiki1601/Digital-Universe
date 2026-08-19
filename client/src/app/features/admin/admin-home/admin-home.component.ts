import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-admin-home',
  imports: [EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="admin-placeholder">
      <app-empty-state
        icon="🛠️"
        title="Admin Dashboard"
        message="Platform, theme, and user management arrive in a later phase."
      />
    </div>
  `,
  styles: `
    .admin-placeholder {
      max-width: 900px;
      margin: 0 auto;
      padding: 4rem 2rem;
    }
  `
})
export class AdminHomeComponent {}
