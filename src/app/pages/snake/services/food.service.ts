import { Injectable } from '@angular/core';
import { Model } from '../shared/types/model';
import { PositionGenerationService } from './position-generation.service';
import { SnakeService } from './snake.service';
import { Constants } from '../shared/constants/constants';
import { Position } from '../shared/interfaces/position';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  model!: Model;
  constructor(
    private readonly positionGeneratorService: PositionGenerationService,
    private readonly snakeService: SnakeService,
  ) {}

  set addScore(value: number) {
    this.model.score += value;
    this.model.updateLevel();
    if (this.model.score > this.model.bestScore) {
      this.model.bestScore = this.model.score;
      localStorage.setItem(
        Constants.localStorageKey,
        this.model.bestScore.toString(),
      );
    }
  }

  get currentScore() {
    return this.model.score;
  }

  init(model: Model): void {
    this.model = model;
    this.model.foodPosition = this.getRandomFoodPosition();
  }

  update(): void {
    if (this.snakeService.onSnake()) {
      this.snakeService.expandSnake();
      this.model.foodPosition = this.getRandomFoodPosition();
      this.addScore = 1;
      this.model.eatFoodSound.play();
    }
  }

  draw(gameBoard: any): void {
    const foodElement: HTMLDivElement = document.createElement('div');
    foodElement.style.gridRowStart = this.model.foodPosition.y.toString();
    foodElement.style.gridColumnStart = this.model.foodPosition.x.toString();
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
  }

  getRandomFoodPosition(): Position {
    return this.positionGeneratorService.getRandomGridPosition();
  }
}
