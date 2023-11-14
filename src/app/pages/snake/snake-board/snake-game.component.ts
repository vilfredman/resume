import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Model } from '../shared/types/model';
import { KeyDirection } from '../shared/types/key-direction';
import { FoodService } from '../services/food.service';
import { SnakeService } from '../services/snake.service';
import { PositionGenerationService } from '../services/position-generation.service';
import { InputService } from '../services/input.service';
import { ObstaclesService } from '../services/obstacles.service';
import { TimerService } from '../services/timer.service';
import { Constants } from '../shared/constants/constants';
import { interval } from 'rxjs';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.scss'],
})
export class SnakeGameComponent implements OnInit, AfterViewInit, OnDestroy {
  model: Model = new Model();
  protected readonly keysDirection = KeyDirection;

  constructor(
    readonly foodService: FoodService,
    private readonly snakeService: SnakeService,
    private readonly positionGeneratorService: PositionGenerationService,
    private readonly inputService: InputService,
    private readonly obstaclesService: ObstaclesService,
    readonly timer: TimerService,
  ) {}

  get snakeSpeed(): number {
    return this.model.level < 10
      ? this.model.baseSpeed + this.model.level
      : this.model.baseSpeed + 10;
  }
  ngOnInit(): void {
    this.positionGeneratorService.init(this.model);
    this.snakeService.init(this.model);
    this.snakeService.listenToInputs();
    this.foodService.init(this.model);
    this.inputService.init(this.model);
    this.obstaclesService.init(this.model);
    this.timer.init(this.model);
    this.model.bestScore =
      Number(localStorage.getItem(Constants.localStorageKey)) || 0;
    this.model.timeSubscription = interval(1000).subscribe((): void => {
      if (this.model.gameOver !== undefined) this.timer.updateTime();
    });
  }

  ngAfterViewInit(): void {
    this.model.gameBoard = document.querySelector(
      Constants.gameBoardContainer,
    ) as HTMLDivElement;
    if (!this.model.gameBoard)
      throw new Error(
        `Undefined container with selector "${Constants.gameBoardContainer}"`,
      );
    window.requestAnimationFrame(this.start.bind(this));
    document.addEventListener('keydown', (e: KeyboardEvent): void => {
      if (e.code === 'Escape' && this.model.gameOver !== undefined)
        this.togglePause();
      if (e.code === 'KeyR') this.restart();
    });
  }

  start(currentTime: any): void {
    if (this.model.isPaused) return;
    window.requestAnimationFrame(this.start.bind(this));
    const secondsSinceLastRender: number =
      (currentTime - this.model.lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / this.snakeSpeed) return;
    this.model.lastRenderTime = currentTime;
    this.update();
    if (!this.model.gameOver) this.draw();
  }

  dPadMovement(direction: KeyDirection): void {
    this.snakeService.inputService.setDirection(direction);
  }

  update(): void {
    this.snakeService.update();
    this.foodService.update();
    this.obstaclesService.update();
    this.checkDeath();
  }

  draw(): void {
    this.model.gameBoard.innerHTML = '';
    this.snakeService.draw(this.model.gameBoard);
    this.foodService.draw(this.model.gameBoard);
    this.obstaclesService.draw(this.model.gameBoard);
  }

  checkDeath(): void {
    if (!this.model.gameOver) return;
    this.model.gameBoard.classList.add('blur');
    this.model.deathSound.play();
  }

  restart(): void {
    window.location.reload();
  }

  togglePause(): void {
    if (this.model.isPaused) {
      this.timer.resumeTimer();
      this.start(performance.now());
    } else {
      this.timer.pauseTimer();
    }
  }
  ngOnDestroy(): void {
    this.model.timeSubscription.unsubscribe();
  }
}
