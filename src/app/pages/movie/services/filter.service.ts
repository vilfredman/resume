import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private _apiKey: string = '5874acfd11651a28c55771624f7021f4';
  private _title: string = '';
  private _year: string = '';
  private _page: number = 1;
  private _language: string = 'en-US';
  private _popupId: number = 0;

  get page(): number {
    return this._page;
  }

  set page(value: number) {
    this._page = value;
  }
  get year(): string {
    return this._year;
  }

  set year(value: string) {
    this._year = value;
  }
  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
  get popupId(): number {
    return this._popupId;
  }

  set popupId(value: number) {
    this._popupId = value;
  }

  get toQuery() {
    let query: string = this.staticParams + `&page=${this._page}`;

    if (this._title) query += `&query=${this._title}`;

    if (this._year) {
      query += this._title
        ? `&primary_release_year=${this._year}`
        : `&primary_release_date.gte=${this._year}-01-01&primary_release_date.lte=${this._year}-12-31`;
    }
    return query;
  }

  get staticParams(): string {
    return `?api_key=${this._apiKey}&language=${this._language}`;
  }
}
