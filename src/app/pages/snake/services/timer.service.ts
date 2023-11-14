import { Injectable } from '@angular/core';
import { Model } from '../shared/types/model';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  model!: Model;
  private startTime: number = -10;
  private accumulatedPausedTime: number = 0;

  init(model: Model): void {
    this.model = model;
  }

  pauseTimer(): void {
    if (!this.model.isPaused) {
      this.model.isPaused = true;
      this.accumulatedPausedTime = performance.now() - this.startTime;
    }
  }

  resumeTimer(): void {
    if (this.model.isPaused && !this.model.gameOver) {
      this.startTime = performance.now() - this.accumulatedPausedTime;
      this.model.isPaused = false;
    }
  }

  updateTime(): void {
    if (this.startTime === -10) this.startTime = performance.now() - 1;
    if (!this.model.isPaused) {
      const currentTime: number = performance.now();
      const deltaTime: number = (currentTime - this.startTime) / 1000;
      this.model.time = Math.floor(deltaTime);
    }
  }
}
