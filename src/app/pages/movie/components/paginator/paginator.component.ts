import { Component } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { DataService } from '../../services/data.service';
import { ResponseProcessService } from '../../services/response-process.service';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  constructor(
    public readonly filterService: FilterService,
    public readonly dataService: DataService,
    private responseProcessService: ResponseProcessService,
  ) {}

  onPageChange(event: PaginatorState): void {
    this.filterService.page = (event.first as number) + 1;
    this.responseProcessService
      .responseDistributions()
      .then()
      .catch((error: any): void => console.error('Error', error));
  }
}
