import { Injectable } from '@angular/core';
import { Model } from '../shared/types/model';
import { Constants } from '../shared/constants/constants';
import { Position } from '../shared/interfaces/position';

@Injectable({
  providedIn: 'root',
})
export class PositionGenerationService {
  model!: Model;
  private readonly excludeRadius: number;
  private readonly maxX: number;
  private readonly maxY: number;
  constructor() {
    this.excludeRadius = 5;
    this.maxX = Constants.gridSizeX;
    this.maxY = Constants.gridSizeY;
  }

  init(model: Model): void {
    this.model = model;
  }

  getRandomGridPosition(): Position {
    let newPosition: Position;
    do {
      newPosition = this.generateRandomPosition();
    } while (this.isInvalidPosition(newPosition));
    return newPosition;
  }

  private generateRandomPosition(): Position {
    return {
      x: Math.floor(Math.random() * this.maxX) + 1,
      y: Math.floor(Math.random() * this.maxY) + 1,
    };
  }

  private isInvalidPosition(position: Position): boolean {
    return (
      this.isOccupiedPosition(
        position,
        [this.model.snakeBody[0]],
        this.excludeRadius,
      ) ||
      this.isOccupiedPosition(position, this.model.snakeBody) ||
      this.isOccupiedPosition(position, this.model.obstacles) ||
      this.isOccupiedPosition(position, [this.model.foodPosition])
    );
  }

  private isOccupiedPosition(
    position: Position,
    elements: Position[],
    excludeRadius: number = 1,
  ) {
    return elements.some(
      (element: Position) =>
        Math.abs(element.x - position.x) <= excludeRadius &&
        Math.abs(element.y - position.y) <= excludeRadius,
    );
  }
}
