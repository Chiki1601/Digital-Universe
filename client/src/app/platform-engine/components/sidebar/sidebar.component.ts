import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface SidebarLink {
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  readonly title = input('Browse');
  readonly links = input.required<SidebarLink[]>();
}
