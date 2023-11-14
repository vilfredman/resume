import { Injectable } from '@angular/core';
import { CalculatorButtonsModel } from '../shared/types/calculator-buttons.model';
import { CalculatorValuesModel } from '../shared/types/calculator-values.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  buttons: CalculatorButtonsModel;
  values: CalculatorValuesModel;
  constructor() {
    this.buttons = new CalculatorButtonsModel();
    this.values = new CalculatorValuesModel();
  }
}
