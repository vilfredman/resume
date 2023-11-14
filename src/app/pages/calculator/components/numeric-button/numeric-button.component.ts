import { Component, Input } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-numeric-button',
  templateUrl: './numeric-button.component.html',
  styleUrls: [
    '../../shared/styles/base-button.style.css',
    './numeric-button.component.css',
  ],
})
export class NumericButtonComponent {
  @Input() label!: string;

  constructor(private dataService: DataService) {}

  onButtonClick(): void {
    this.updateCurrentValue();
  }

  private invalidInput(): boolean {
    return /[^0-9.\-]/.test(this.dataService.values.currentOperandValue);
  }

  private updateCurrentValue(): void {
    if (this.invalidInput()) this.dataService.values.currentOperandValue = '0';
    if (this.dataService.values.currentOperandValue.length > 8) return;
    if (this.label === '.') {
      if (this.dataService.values.currentOperandValue.includes('.')) return;
      if (this.dataService.values.currentOperandValue === '')
        this.dataService.values.currentOperandValue = '0';
    }
    if (
      this.dataService.values.currentOperandValue === '0' &&
      this.label != '.'
    )
      this.dataService.values.currentOperandValue = this.label;
    else
      this.dataService.values.currentOperandValue =
        this.dataService.values.currentOperandValue + this.label;
  }
}
