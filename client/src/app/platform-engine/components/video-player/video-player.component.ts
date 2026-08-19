import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, effect, inject, input, output, signal } from '@angular/core';

const TICK_MS = 400;
const PROGRESS_PER_TICK = 1.2;

/**
 * A mock playback UI - there is no real video source. It simulates progress so
 * OTT-style "continue watching" state has something real to drive it, without
 * pretending to stream actual media.
 */
@Component({
  selector: 'app-video-player',
  imports: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent {
  readonly title = input.required<string>();
  readonly accentIndex = input(0);
  readonly initialProgress = input(0);
  readonly progressChange = output<number>();

  protected readonly isPlaying = signal(false);
  private readonly manualProgress = signal<number | null>(null);
  protected readonly progress = computed(() => this.manualProgress() ?? this.initialProgress());

  private intervalId?: ReturnType<typeof setInterval>;

  constructor() {
    effect(() => {
      this.initialProgress();
      this.manualProgress.set(null);
      this.isPlaying.set(false);
      this.stopTicking();
    });

    inject(DestroyRef).onDestroy(() => this.stopTicking());
  }

  togglePlay(): void {
    this.isPlaying.update((playing) => !playing);
    this.isPlaying() ? this.startTicking() : this.stopTicking();
  }

  onSeek(value: string): void {
    const percent = Number(value);
    this.manualProgress.set(percent);
    this.progressChange.emit(percent);
  }

  private startTicking(): void {
    this.intervalId = setInterval(() => {
      const next = Math.min(100, this.progress() + PROGRESS_PER_TICK);
      this.manualProgress.set(next);
      this.progressChange.emit(next);

      if (next >= 100) {
        this.isPlaying.set(false);
        this.stopTicking();
      }
    }, TICK_MS);
  }

  private stopTicking(): void {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
}
