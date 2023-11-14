import { Component, Input } from '@angular/core';
import { ResponseProcessService } from './services/response-process.service';
import { DataService } from './services/data.service';
import { Movie } from './shared/interfaces/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent {
  @Input() movie!: Movie;
  constructor(
    public readonly dataService: DataService,
    private responseService: ResponseProcessService,
  ) {
    this.responseService
      .saveAndProcessGenres()
      .then()
      .catch((error): void => {
        console.error('Error detected:', error);
      });
    this.responseService
      .responseDistributions()
      .then()
      .catch((error): void => {
        console.error('Error detected:', error);
      });
  }
}
