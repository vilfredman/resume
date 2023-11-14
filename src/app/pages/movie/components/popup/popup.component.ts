import { Component, OnInit } from '@angular/core';
import { Movie } from '../../shared/interfaces/movie';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FilterService } from '../../services/filter.service';
import { ResponseProcessService } from '../../services/response-process.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  movie: Movie = this.dataService.selectedMovie;
  genres?: string = this.dataService.convertIdsToGenres(this.movie.genreIds);
  trailerURL!: SafeResourceUrl;

  constructor(
    public readonly filterService: FilterService,
    public readonly responseProcessService: ResponseProcessService,
    public readonly dataService: DataService,
    private sanitizer: DomSanitizer,
  ) {}
  async ngOnInit(): Promise<void> {
    this.filterService.popupId = this.movie.id;
    this.trailerURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      await this.responseProcessService.responseTrailer(),
    );
  }
}
