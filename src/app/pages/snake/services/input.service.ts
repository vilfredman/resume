import { Injectable } from '@angular/core';
import { Model } from '../shared/types/model';
import { Position } from '../shared/interfaces/position';
import { KeyDirection } from '../shared/types/key-direction';

@Injectable({
  providedIn: 'root',
})
export class InputService {
  model!: Model;
  inputDirection: Position = { x: 0, y: 0 };
  lastInputDirection: Position = { x: 0, y: 0 };
  init(model: Model): void {
    this.model = model;
  }

  getInputs(): void {
    window.addEventListener('keydown', (e: KeyboardEvent): void => {
      if (
        !this.model.isPaused &&
        !this.model.gameOver &&
        Object.values(KeyDirection).includes(e.code as KeyDirection)
      ) {
        this.setDirection(e.code as KeyDirection);
      }
    });
  }

  setDirection(direction: KeyDirection): void {
    this.model.gameOver = false;
    switch (direction) {
      case KeyDirection.arrowUp:
        if (this.lastInputDirection.y !== 0) break;
        this.inputDirection = { x: 0, y: -1 };
        this.model.headTurn = 180;
        break;
      case KeyDirection.arrowDown:
        if (this.lastInputDirection.y !== 0) break;
        this.inputDirection = { x: 0, y: 1 };
        this.model.headTurn = 0;
        break;
      case KeyDirection.arrowLeft:
        if (this.lastInputDirection.x !== 0) break;
        this.inputDirection = { x: -1, y: 0 };
        this.model.headTurn = 90;
        break;
      case KeyDirection.arrowRight:
        if (this.lastInputDirection.x !== 0) break;
        this.inputDirection = { x: 1, y: 0 };
        this.model.headTurn = -90;
        break;
    }
  }

  getInputDirection(): Position {
    this.lastInputDirection = this.inputDirection;
    return this.inputDirection;
  }
}
