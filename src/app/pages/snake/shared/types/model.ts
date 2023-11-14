import { Subscription } from 'rxjs';
import { Position } from '../interfaces/position';

export class Model {
  timeSubscription!: Subscription;
  lastRenderTime: number = 0;
  requiredObstacles: number = 0;
  gameBoard!: HTMLDivElement;
  bestScore: number = 0;
  score: number = 0;
  newSegments: number = 0;
  foodPosition: Position = { x: -5, y: -5 };
  snakeBody: Position[] = [{ x: 16, y: 9 }];
  obstacles: Position[] = [];
  headTurn: number = 0;
  time: number = 0;
  eatFoodSound: HTMLAudioElement = new Audio(
    'assets/sound/eat_crunchy-40919.mp3',
  );
  deathSound: HTMLAudioElement = new Audio(
    'assets/sound/monster-death-grunt-131480.mp3',
  );
  eatYourself: HTMLAudioElement = new Audio(
    'assets/sound/breeze-of-blood-122253.mp3',
  );
  readonly baseSpeed: number = 4;
  private _level: number = 1;
  private _isPaused: boolean = false;
  private _gameOver!: boolean;

  get gameOver(): boolean {
    return this._gameOver;
  }

  set gameOver(value: boolean) {
    this._gameOver = value;
    if (value) this._isPaused = true;
  }
  get isPaused(): boolean {
    return this._isPaused;
  }

  set isPaused(value: boolean) {
    this._isPaused = value;
  }
  get level(): number {
    return this._level;
  }

  set level(value: number) {
    if (value >= 5) this.gameBoard.style.border = 'solid 2px #28647e';
    else this.gameBoard.style.border = 'solid 5px red';
    if (value >= 10) this.requiredObstacles = value - 5;
    else this.requiredObstacles = 0;
    this._level = value;
  }

  updateLevel(): void {
    this.level = Math.ceil((this.score + 1) / 5);
  }
}
