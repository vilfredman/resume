import { Pipe, PipeTransform } from '@angular/core';
import { ActionsEnum } from '../types/actions.enum';
import { NumericsEnum } from '../types/numerics.enum';
import { OperationsEnum } from '../types/operations.enum';

@Pipe({
  name: 'enumPipe',
})
export class EnumPipePipe implements PipeTransform {
  transform(label: any, buttonType: string): boolean {
    if (buttonType === 'actions')
      return Object.values(ActionsEnum).includes(label);
    if (buttonType === 'numerics')
      return Object.values(NumericsEnum).includes(label);
    if (buttonType === 'operations')
      return Object.values(OperationsEnum).includes(label);
    return false;
  }
}
