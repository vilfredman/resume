import { Injectable } from '@angular/core';
import { Model } from '../shared/types/model';
import { InputService } from './input.service';
import { ObstaclesService } from './obstacles.service';
import { Position } from '../shared/interfaces/position';
import { Constants } from '../shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class SnakeService {
  model!: Model;
  constructor(
    readonly inputService: InputService,
    private readonly obstaclesService: ObstaclesService,
  ) {}

  init(model: Model): void {
    this.model = model;
  }

  listenToInputs(): void {
    this.inputService.getInputs();
  }

  update(): void {
    this.moveSnake();
    this.updateSnakeHead();
    this.checkSnakeIntersection();
  }

  draw(gameBoard: any): void {
    this.model.snakeBody.forEach(
      (segment: { x: number; y: number }, i: number): void => {
        const snakeElement: HTMLDivElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y.toString();
        snakeElement.style.gridColumnStart = segment.x.toString();
        snakeElement.classList.add('snake');
        if (i == 0) {
          snakeElement.classList.add('head');
          snakeElement.style.transform =
            'rotate(' + this.model.headTurn + 'deg)';
        } else {
          const prevPart: Position = this.model.snakeBody[i - 1];
          let bodyTurn: number = 0;
          if (segment.x > prevPart.x) bodyTurn = 90;
          if (segment.x < prevPart.x) bodyTurn = -90;
          if (segment.y > prevPart.y) bodyTurn = -180;
          if (segment.y < prevPart.y) bodyTurn = 0;
          snakeElement.style.transform = 'rotate(' + bodyTurn + 'deg)';
        }
        gameBoard.appendChild(snakeElement);
      },
    );
  }

  expandSnake(): void {
    this.model.newSegments += 1;
  }

  onSnake(): boolean {
    return this.model.snakeBody.some((segment: Position): boolean => {
      return this.equalPosition(segment, this.model.foodPosition);
    });
  }

  equalPosition(pos1: Position, pos2: Position): boolean {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }

  private outsideGrid(pos1: Position, pos2: Position): boolean {
    return (
      (pos1.x === 1 && pos2.x === Constants.gridSizeX) ||
      (pos1.x === Constants.gridSizeX && pos2.x === 1) ||
      (pos1.y === 1 && pos2.y === Constants.gridSizeY) ||
      (pos1.y === Constants.gridSizeY && pos2.y === 1)
    );
  }

  private addSegments(): void {
    for (let i: number = 0; i < this.model.newSegments; i++) {
      this.model.snakeBody.push({
        ...this.model.snakeBody[this.model.snakeBody.length - 1],
      });
    }
    this.model.newSegments = 0;
  }

  private moveSnake(): void {
    this.addSegments();
    for (let i: number = this.model.snakeBody.length - 2; i >= 0; i--) {
      this.model.snakeBody[i + 1] = { ...this.model.snakeBody[i] };
    }
  }

  private updateSnakeHead(): void {
    const inputDirection: Position = this.inputService.getInputDirection();
    const newHeadX: number =
      ((this.model.snakeBody[0].x +
        inputDirection.x +
        Constants.gridSizeX -
        1) %
        Constants.gridSizeX) +
      1;
    const newHeadY: number =
      ((this.model.snakeBody[0].y +
        inputDirection.y +
        Constants.gridSizeY -
        1) %
        Constants.gridSizeY) +
      1;
    if (
      (this.model.level < 5 &&
        this.outsideGrid(this.model.snakeBody[0], {
          x: newHeadX,
          y: newHeadY,
        })) ||
      this.obstaclesService.checkObstaclesCollision(this.model.snakeBody[0])
    ) {
      this.model.gameOver = true;
    }
    this.model.snakeBody[0] = { x: newHeadX, y: newHeadY };
  }

  private snakeIntersection(): number {
    for (let i: number = 1; i < this.model.snakeBody.length; i++) {
      if (this.equalPosition(this.model.snakeBody[0], this.model.snakeBody[i]))
        return i;
    }
    return 0;
  }

  private checkSnakeIntersection(): void {
    const intersectionIndex: number = this.snakeIntersection();
    if (intersectionIndex) {
      if (this.model.level < 10) {
        this.model.gameOver = true;
      } else {
        this.model.eatYourself.play();
        this.model.snakeBody.splice(Number(intersectionIndex));
        this.model.score = this.model.snakeBody.length - 1;
        this.model.updateLevel();
      }
    }
  }
}
