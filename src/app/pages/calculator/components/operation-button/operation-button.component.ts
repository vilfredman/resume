import { Component, Input } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-operation-button',
  templateUrl: './operation-button.component.html',
  styleUrls: [
    '../../shared/styles/base-button.style.css',
    './operation-button.component.css',
  ],
})
export class OperationButtonComponent {
  @Input() label!: string;

  constructor(private dataService: DataService) {}

  onButtonClick(): void {
    this.setOperator(this.label);
  }

  private invalidNumber(): boolean {
    return /[^0-9.\-e+]/.test(this.dataService.values.firstOperand);
  }

  private setOperator(operator: string): void {
    if (!this.dataService.values.firstOperand) {
      this.dataService.values.currentOperandValue = '0';
      this.dataService.values.operator = operator;
      return;
    }
    if (!this.dataService.values.secondOperand) {
      if (this.invalidNumber()) {
        this.dataService.values.currentOperandValue = '0';
        return;
      }
      if (
        this.dataService.values.firstOperand[
          this.dataService.values.firstOperand.length - 1
        ] === '.'
      )
        this.dataService.values.currentOperandValue =
          this.dataService.values.firstOperand.slice(0, -1);
      this.dataService.values.operator = operator;
    } else {
      this.dataService.values.equal();
      this.setOperator(operator);
    }
  }
}
