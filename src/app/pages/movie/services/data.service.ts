import { Injectable } from '@angular/core';
import { Movie } from '../shared/interfaces/movie';
import { Genres } from '../shared/interfaces/genres';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  movies!: Movie[];
  selectedMovie!: Movie;
  popup: boolean = false;
  private _genres!: [Genres];
  private _totalCount!: number;
  private _totalPages!: number;

  get totalPages(): number {
    return this._totalPages;
  }

  set totalPages(value: number) {
    this._totalPages = value > 500 ? 500 : value;
  }
  get totalCount(): number {
    return this._totalCount;
  }

  set totalCount(value: number) {
    this._totalCount = value;
  }
  get genres(): [Genres] {
    return this._genres;
  }

  set genres(value: [Genres]) {
    this._genres = value;
  }

  convertIdsToGenres(genresId: number[]): string {
    return genresId.map((id: number) => this._genres[id]).join(', ');
  }
}
