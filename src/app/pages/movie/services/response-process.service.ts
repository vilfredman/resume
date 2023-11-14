import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { Genres } from '../shared/interfaces/genres';

@Injectable({
  providedIn: 'root',
})
export class ResponseProcessService {
  constructor(
    private apiService: ApiService,
    private dataService: DataService,
  ) {}

  async responseDistributions(): Promise<void> {
    const data = await this.apiService.loadData();
    this.dataService.movies = data.results.map((result: any) => {
      return {
        genreIds: result.genre_ids,
        id: result.id,
        originalLanguage: result.original_language,
        originalTitle: result.original_title,
        overview: result.overview,
        popularity: result.popularity,
        posterPath: result.poster_path,
        releaseDate: result.release_date,
        title: result.title,
        voteAverage: result.vote_average,
        voteCount: result.vote_count,
        backdropPath: result.backdropPath,
      };
    });

    this.dataService.totalCount = data.total_results;
    this.dataService.totalPages = data.total_pages;
  }

  async saveAndProcessGenres(): Promise<void> {
    const data = await this.apiService.loadGenres();
    this.dataService.genres = data.genres.reduce((res: any, item: Genres) => {
      res[item.id] = item.name;
      return res;
    }, {});
  }

  async responseTrailer(): Promise<string> {
    const data = await this.apiService.loadTrailer();
    return (
      'https://www.youtube.com/embed/' +
      data.results[data.results.length - 1].key
    );
  }
}
