import { Component } from '@angular/core';

@Component({
  selector: 'app-digital',
  templateUrl: './digital.component.html',
  styleUrls: ['./digital.component.css'],
})
export class DigitalComponent {
  digitalHours = 0;
  digitalMinutes = 0;
  digitalSeconds = 0;
  session = 'AM';

  constructor() {
    this.startClock();
  }
  startClock() {
    setInterval(() => {
      const realTime = new Date();
      this.digitalHours = realTime.getHours() % 12 || 12;
      this.digitalMinutes = realTime.getMinutes();
      this.digitalSeconds = realTime.getSeconds();

      if (new Date().getHours() >= 12) {
        this.session = 'PM';
      } else {
        this.session = 'AM';
      }
    });
  }
}
