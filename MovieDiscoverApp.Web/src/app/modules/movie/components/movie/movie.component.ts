import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
  totalResults: number = 0;
  value: boolean = true;
  movieFilterFormGroup: FormGroup;
  movieUrlQueryString: string = "";
  genres: Genre[] = [];
  searchValue: string;
  results: MovieViewModel[];

  constructor(private movieService: MovieService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.getGenre();
    this.getMovie();
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getGenre() {
    const subscriptionOfGetGenre = this.movieService.getGenres().subscribe({
      next: data => {
        this.genres = data;
      }
    })

    this.subscriptions.push(subscriptionOfGetGenre);
  }

  getMovie() {
    // TODO: error handling should be considered.
    const subscriptionOfGetMovies = this.movieService.getMovies(this.pageNo, this.movieUrlQueryString).subscribe({
      // TODO: You can do it using destructuring, NO NEED here though. But if you know then it would be better
      next: res => {
        this.pageNo = res.page;
        this.totalResults = res.total_pages > 500 ? 10000 : res.total_results;
        this.movies = res.results;
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
    this.buildQueryString();
    this.getMovie();
  }

  onMovieClick(movieId: number) {
    this.router.navigate([RouterConstants.getMovieDetailsPath(movieId)]);
  }

  onSelectPrimaryReleaseYear(event: Date) {
    this.movieFilterFormGroup.patchValue({ primaryReleaseYear: event.getFullYear() })
  }

  // TODO: try to make pure methods/functions. You are changing global state that is movieUrlQueryString. Pure methods/functions will lead you to less buggy code.
  // Although you assigned empty string to make it more safe. What if you can just return the query string from here. It will be pure and no need to play safe.

  // TODO: isn't it a private method?
  buildQueryString() {
    this.movieUrlQueryString = '';
    // TODO: avoid using let, you see you can declare and assign in the below scope. In that case you can directly use const
    let queryString = '';

    Object.keys(this.movieFilterFormGroup.controls).forEach(key => {
      // TODO: Can this be filtered out using es6 .filter(...)
      if(this.movieFilterFormGroup.controls[key].value){
        const queryString = FilterConstants.getQueryString(FilterConstants[key], this.movieFilterFormGroup.value[key].toString());
        this.movieUrlQueryString = this.movieUrlQueryString.concat(queryString);
      }
    });
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
