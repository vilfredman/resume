import { Component } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { ResponseProcessService } from '../../services/response-process.service';

@Component({
  selector: 'app-header-movies',
  templateUrl: './header-movies.component.html',
  styleUrls: ['./header-movies.component.css'],
})
export class HeaderMoviesComponent {
  title: string = '';
  year: string = '';

  constructor(
    private filterService: FilterService,
    private responseService: ResponseProcessService,
  ) {}

  search(): void {
    this.filterService.title = this.title;
    this.filterService.year = this.year;
    this.filterService.page = 1;
    this.responseService
      .responseDistributions()
      .then()
      .catch((error): void => {
        console.log('Error detected:', error);
      });
  }
}
