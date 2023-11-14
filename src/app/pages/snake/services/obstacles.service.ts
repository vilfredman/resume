import { Injectable } from '@angular/core';
import { Model } from '../shared/types/model';
import { PositionGenerationService } from './position-generation.service';
import { Position } from '../shared/interfaces/position';

@Injectable({
  providedIn: 'root',
})
export class ObstaclesService {
  model!: Model;
  constructor(
    private readonly positionGeneratorService: PositionGenerationService,
  ) {}

  init(model: Model): void {
    this.model = model;
  }

  update(): void {
    while (this.model.obstacles.length < this.model.requiredObstacles) {
      this.addObstacles();
    }
    while (this.model.obstacles.length > this.model.requiredObstacles) {
      this.model.obstacles.pop();
    }
  }

  draw(gameBoard: any): void {
    this.model.obstacles.forEach((position: Position): void => {
      const obstacleElement: HTMLDivElement = document.createElement('div');
      obstacleElement.style.gridRowStart = position.y.toString();
      obstacleElement.style.gridColumnStart = position.x.toString();
      obstacleElement.classList.add('obstacle');
      gameBoard.appendChild(obstacleElement);
    });
  }

  addObstacles(): void {
    this.model.obstacles.push(
      this.positionGeneratorService.getRandomGridPosition(),
    );
  }

  checkObstaclesCollision(position: Position): boolean {
    return this.model.obstacles.some(
      (obstacle: Position) =>
        obstacle.x === position.x && obstacle.y === position.y,
    );
  }
}
