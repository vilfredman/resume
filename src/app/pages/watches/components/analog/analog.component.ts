import { Component } from '@angular/core';

@Component({
  selector: 'app-analog',
  templateUrl: './analog.component.html',
  styleUrls: ['./analog.component.css']
})
export class AnalogComponent {

  readonly deg = 6;
  analogHours= 0;
  analogMinutes= 0;
  analogSeconds= 0

  constructor() {
    this.startClock()
  }
  startClock() {
    setInterval(() => {
      let realTime = new Date();
      this.analogHours = (realTime.getHours() % 12) * 30 + this.analogMinutes / 60
      this.analogMinutes = realTime.getMinutes() * this.deg + this.analogSeconds / 60;
      this.analogSeconds = realTime.getSeconds() * this.deg;
    });
  }
}
