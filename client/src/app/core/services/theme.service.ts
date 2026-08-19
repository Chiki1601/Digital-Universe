import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, computed, effect, inject, signal } from '@angular/core';
import { ColorScheme, ResolvedScheme } from '../models/color-scheme.model';
import { CardStyle, ThemeConfig } from '../../platform-engine/models';
import { DARK_THEME, LIGHT_THEME } from '../../platform-engine/themes/default-theme';

const STORAGE_KEY = 'digital-universe.color-scheme';

/**
 * Each platform theme's `cardStyle` maps to a bundle of CSS custom properties
 * rather than a hardcoded class, so any component can opt into the active
 * platform's card treatment just by consuming var(--card-bg) etc.
 */
const CARD_STYLE_VARIABLES: Record<CardStyle, Record<string, string>> = {
  elevated: {
    '--card-bg': 'var(--surface-color)',
    '--card-border': '1px solid transparent',
    '--card-shadow': '0 14px 32px -20px rgb(0 0 0 / 0.45)',
    '--card-backdrop': 'none'
  },
  flat: {
    '--card-bg': 'var(--surface-color)',
    '--card-border': '1px solid color-mix(in srgb, var(--muted-text-color) 12%, transparent)',
    '--card-shadow': 'none',
    '--card-backdrop': 'none'
  },
  outlined: {
    '--card-bg': 'transparent',
    '--card-border': '1.5px solid color-mix(in srgb, var(--muted-text-color) 35%, transparent)',
    '--card-shadow': 'none',
    '--card-backdrop': 'none'
  },
  glass: {
    '--card-bg': 'color-mix(in srgb, var(--surface-color) 55%, transparent)',
    '--card-border': '1px solid color-mix(in srgb, white 12%, transparent)',
    '--card-shadow': '0 10px 34px -18px rgb(0 0 0 / 0.5)',
    '--card-backdrop': 'blur(18px)'
  }
};

/**
 * Drives the CSS custom property theme engine described in the architecture docs.
 * A platform can push its own ThemeConfig (e.g. "cinematic" for CineVerse); when no
 * platform theme is active the app shell falls back to the light/dark universe theme.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  private readonly systemPrefersDark = signal(this.matchesDarkMedia());
  readonly colorScheme = signal<ColorScheme>(this.readStoredScheme());
  readonly activePlatformTheme = signal<ThemeConfig | null>(null);

  readonly resolvedScheme = computed<ResolvedScheme>(() => {
    const scheme = this.colorScheme();
    return scheme === 'system' ? (this.systemPrefersDark() ? 'dark' : 'light') : scheme;
  });

  readonly activeTheme = computed<ThemeConfig>(
    () => this.activePlatformTheme() ?? (this.resolvedScheme() === 'dark' ? DARK_THEME : LIGHT_THEME)
  );

  constructor() {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (event: MediaQueryListEvent) => this.systemPrefersDark.set(event.matches);
    media.addEventListener('change', listener);
    inject(DestroyRef).onDestroy(() => media.removeEventListener('change', listener));

    effect(() => this.applyTheme(this.activeTheme(), this.resolvedScheme()));
  }

  setColorScheme(scheme: ColorScheme): void {
    this.colorScheme.set(scheme);
    localStorage.setItem(STORAGE_KEY, scheme);
  }

  setPlatformTheme(theme: ThemeConfig | null): void {
    this.activePlatformTheme.set(theme);
  }

  private applyTheme(theme: ThemeConfig, scheme: ResolvedScheme): void {
    const root = this.document.documentElement;
    root.setAttribute('data-theme', scheme);
    root.setAttribute('data-card-style', theme.cardStyle);
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--background-color', theme.backgroundColor);
    root.style.setProperty('--surface-color', theme.surfaceColor);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--muted-text-color', theme.mutedTextColor);
    root.style.setProperty('--border-radius', theme.borderRadius);
    root.style.setProperty('--font-family', theme.fontFamily);

    for (const [property, value] of Object.entries(CARD_STYLE_VARIABLES[theme.cardStyle])) {
      root.style.setProperty(property, value);
    }
  }

  private readStoredScheme(): ColorScheme {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
  }

  private matchesDarkMedia(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
