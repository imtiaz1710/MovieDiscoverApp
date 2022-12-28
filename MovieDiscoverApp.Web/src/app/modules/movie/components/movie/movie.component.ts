import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, Observable, of, Subscription, throwError } from 'rxjs';
import { FilterConstants } from 'src/app/shared/constants/filter-constant';
import { RouterConstants } from 'src/app/shared/constants/router-constants';
import { Genre, MovieViewModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  // TODO: Please use access modifiers. Make private or public or even protected based on the accessibility
  // TODO: Remeber to order the fields and methods to public protected private. in that order. Ref: Clean Code by Robert Cecil Martin
  // TODO: do not need to initialize all the variables initially, by default they will be assigned to corresponding type's falsy values.
  subscriptions: Subscription[] = [];
  movies: MovieViewModel[] = [];
  pageNo: number = 1;
  currentSearchSuggestionPage: number = 1;
  totalResults: number;
  value: boolean = true;
  movieFilterFormGroup: FormGroup;
  movieUrlQueryString: string;
  genres$: Observable<Genre[]>;
  searchValue: string;
  results: MovieViewModel[];

  constructor(private movieService: MovieService, private formBuilder: FormBuilder, 
    private router: Router) {
  }

  ngOnInit(): void {
    this.genres$ = this.movieService.getGenres();
    this.getMovie();
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


  getMovie() {
    const subscriptionOfGetMovies = this.movieService.getMovies(this.pageNo, this.movieUrlQueryString).subscribe({
      next: res => {
        this.pageNo = res.page;
        this.totalResults = res.total_pages > 500 ? 10000 : res.total_results;
        this.movies = res.results;
      },
      error: err => {
        console.log(err);
      }
    });

    this.subscriptions.push(subscriptionOfGetMovies);
  }

  getMoviePosterUrl(fileName: string) {
    return RouterConstants.generateFullImageUrl(fileName);
  }

  onPageChange(event: any) {
    this.pageNo = event.page + 1;
    this.getMovie();
  }

  onFilterButtonClick() {
    this.movieUrlQueryString = this.buildQueryString();
    this.getMovie();
  }

  onMovieClick(movieId: number) {
    this.router.navigate([RouterConstants.getMovieDetailsPath(movieId)]);
  }

  onSelectPrimaryReleaseYear(event: Date) {
    this.movieFilterFormGroup.patchValue({ primaryReleaseYear: event.getFullYear() })
  }
  
  private buildQueryString(): string {
    const url = '';

    const keys = Object.keys(this.movieFilterFormGroup.controls).filter(key => {
      return this.movieFilterFormGroup.controls[key].value;
    });

    keys.forEach(k => {
      const queryString = FilterConstants.getQueryString(FilterConstants[k], this.movieFilterFormGroup.value[k].toString());
      url.concat(queryString);
    })

    return url;
  }

  onSearch() {
    this.currentSearchSuggestionPage = 1;
    this.loadSearchSuggestion();
  }

  loadSearchSuggestion() {
    this.movieService.searchMovie(this.currentSearchSuggestionPage, this.searchValue).subscribe(data => {
      this.results = data;
    });
  }

  onSelectSearchSuggestion(event: MovieViewModel) {
    this.onMovieClick(event.id);
  }

  buildForm() {
    this.movieFilterFormGroup = this.formBuilder.group(
      {
        primaryReleaseYear: new FormControl<number>(0),
        includeAdult: new FormControl<Boolean>(false),
        includeVideo: new FormControl<Boolean>(false),
        withGenres: new FormControl<string>('')
      }
    );
  }
}
