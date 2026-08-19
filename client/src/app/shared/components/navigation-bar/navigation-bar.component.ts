import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { ColorScheme } from '../../../core/models/color-scheme.model';

@Component({
  selector: 'app-navigation-bar',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent {
  protected readonly themeService = inject(ThemeService);

  protected readonly schemes: ColorScheme[] = ['light', 'dark', 'system'];

  setScheme(scheme: ColorScheme): void {
    this.themeService.setColorScheme(scheme);
  }
}
