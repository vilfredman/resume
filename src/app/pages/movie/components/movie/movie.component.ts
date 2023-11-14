import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../shared/interfaces/movie';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  @Input() movie!: Movie;
  genres!: string;
  constructor(public readonly dataService: DataService) {}

  ngOnInit(): void {
    this.genres = this.dataService.convertIdsToGenres(this.movie.genreIds);
  }

  openPopup(): void {
    this.dataService.selectedMovie = this.movie;
    this.dataService.popup = true;
  }
}
