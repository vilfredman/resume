import { Component, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActionsEnum } from '../../shared/types/actions.enum';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: [
    '../../shared/styles/base-button.style.css',
    './action-button.component.css',
  ],
})
export class ActionButtonComponent {
  @Input() label!: string;

  constructor(private dataService: DataService) {}

  onButtonClick(): void {
    switch (this.label) {
      case ActionsEnum.Clear:
        this.dataService.values.clearAll();
        break;
      case ActionsEnum.Backspace:
        this.dataService.values.backSpace();
        break;
      case ActionsEnum.Percent:
        this.dataService.values.percent();
        break;
      case ActionsEnum.Negative:
        this.dataService.values.negateNumber();
        break;
      case ActionsEnum.Equals:
        this.dataService.values.equal();
        break;
    }
  }
}
