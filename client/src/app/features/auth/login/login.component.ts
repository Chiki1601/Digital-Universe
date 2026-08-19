import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-login',
  imports: [EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="login-placeholder">
      <app-empty-state
        icon="🔐"
        title="Sign In"
        message="JWT authentication and role-based access control arrive in a later phase."
      />
    </div>
  `,
  styles: `
    .login-placeholder {
      max-width: 900px;
      margin: 0 auto;
      padding: 4rem 2rem;
    }
  `
})
export class LoginComponent {}
