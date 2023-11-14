import { OperationsEnum } from './operations.enum';

export class CalculatorValuesModel {
  private _firstOperand: string = '0';
  private _secondOperand: string = '';
  private _operator: string = '';

  get firstOperand(): string {
    return this._firstOperand;
  }

  get secondOperand(): string {
    return this._secondOperand;
  }

  get operator(): string {
    return this._operator;
  }

  set operator(operator: string) {
    this._operator = operator;
  }

  get displayValue(): string {
    return (
      this._firstOperand + ' ' + this._operator + ' ' + this._secondOperand
    );
  }

  get currentOperandValue(): string {
    return this._operator ? this._secondOperand : this._firstOperand;
  }

  set currentOperandValue(value: string) {
    if (this._operator) this._secondOperand = value;
    else this._firstOperand = value;
  }

  equal(): void {
    if (!this._operator) return;
    if (this._secondOperand !== '') {
      const first: number = parseFloat(this._firstOperand);
      const second: number = parseFloat(this._secondOperand);
      switch (this._operator) {
        case OperationsEnum.Plus:
          this._firstOperand = String(first + second);
          break;
        case OperationsEnum.Minus:
          this._firstOperand = String(first - second);
          break;
        case OperationsEnum.Multiply:
          this._firstOperand = String(first * second);
          break;
        case OperationsEnum.Divide:
          if (second === 0) this._firstOperand = 'Can`t divide with zero!';
          else this._firstOperand = String(first / second);
          break;
        default:
          throw new Error(`Can't find operator with id "${this._operator}"`);
      }
      if (!(this._firstOperand === 'Can`t divide with zero!'))
        this.convertResult();
      this._secondOperand = '';
      this._operator = '';
    }
  }
  clearAll(): void {
    this._firstOperand = '0';
    this._secondOperand = '';
    this._operator = '';
  }

  backSpace(): void {
    if (this._secondOperand !== '') {
      this._secondOperand = this._secondOperand.slice(0, -1);
    } else if (this._operator !== '') {
      this._operator = '';
    } else {
      if (this.invalidNumber()) this._firstOperand = '0';

      this._firstOperand = this._firstOperand.slice(0, -1);
      if (this._firstOperand === '') this._firstOperand = '0';
    }
  }

  percent(): void {
    if (this._secondOperand !== '')
      this._secondOperand = String(parseFloat(this._secondOperand) / 100);
    else {
      this._firstOperand = String(parseFloat(this._firstOperand) / 100);
      this._operator = '';
    }
  }

  negateNumber(): void {
    if (this._operator)
      this._secondOperand =
        this._secondOperand !== ''
          ? String(parseFloat(this._secondOperand) * -1)
          : '';
    else this._firstOperand = String(parseFloat(this._firstOperand) * -1);
  }

  private invalidNumber(): boolean {
    return /[^0-9.\-e+]/.test(this._firstOperand);
  }

  private convertResult(): void {
    const buffer: string = this._firstOperand
      .toLocaleString()
      .replace(',', '.')
      .replace(new RegExp(' ', 'g'), '');
    this._firstOperand =
      buffer.length > 10 ? Number(buffer).toExponential(3).toString() : buffer;
  }
}
