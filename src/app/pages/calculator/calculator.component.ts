import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  constructor(public dataService: DataService) {}
}
