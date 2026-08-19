import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="not-found">
      <p class="not-found__code">404</p>
      <h1>Lost in the universe.</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a routerLink="/">Back to Home</a>
    </div>
  `,
  styles: `
    .not-found {
      max-width: 640px;
      margin: 0 auto;
      padding: 6rem 2rem;
      text-align: center;
      color: var(--muted-text-color);
    }
    .not-found__code {
      font-size: 3.5rem;
      font-weight: 800;
      margin: 0;
      color: var(--primary-color);
    }
    .not-found h1 {
      color: var(--text-color);
      margin: 0.5rem 0;
    }
    .not-found a {
      display: inline-block;
      margin-top: 1.5rem;
      color: var(--primary-color);
      font-weight: 600;
      text-decoration: none;
    }
  `
})
export class NotFoundComponent {}
