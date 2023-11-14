import { Injectable } from '@angular/core';
import { FilterService } from './filter.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _baseURL: string = 'https://api.themoviedb.org/3/';
  constructor(private filterService: FilterService) {}

  private get _genresURL(): string {
    return this._baseURL + 'genre/movie/list' + this.filterService.staticParams;
  }

  private get _moviesURL() {
    const movie = this.filterService.title ? 'search/movie' : 'discover/movie';
    return this._baseURL + movie + this.filterService.toQuery;
  }

  private get _trailerURL(): string {
    return (
      this._baseURL +
      'movie/' +
      this.filterService.popupId +
      '/videos' +
      this.filterService.staticParams
    );
  }

  async loadData(): Promise<any> {
    const response: Response = await fetch(this._moviesURL);
    return await response.json();
  }

  async loadGenres(): Promise<any> {
    const response: Response = await fetch(this._genresURL);
    return await response.json();
  }

  async loadTrailer(): Promise<any> {
    const response: Response = await fetch(this._trailerURL);
    return await response.json();
  }
}
