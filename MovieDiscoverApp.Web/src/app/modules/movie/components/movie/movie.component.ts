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
  public currentSearchSuggestionPage: number = 1;
  public totalResults: number;
  public value: boolean = true;
  public movieFilterFormGroup: FormGroup;
  public movieUrlQueryString: string;
  public genres$: Observable<Genre[]>;
  public searchValue: string;
  public searchSuggestions$: Observable<MovieViewModel[]>;
  public movies: MovieViewModel[] = [];
  private subscriptions: Subscription[] = [];
  private pageNo: number = 1;

  public constructor(private movieService: MovieService, private formBuilder: FormBuilder, 
    private router: Router) {
  }

  public ngOnInit(): void {
    this.genres$ = this.movieService.getGenres();
    this.getMovie();
    this.buildForm();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public getMoviePosterUrl(fileName: string) {
    return RouterConstants.generateFullImageUrl(fileName);
  }

  public onPageChange(event: any) {
    this.pageNo = event.page + 1;
    this.getMovie();
  }

  public onFilterButtonClick() {
    this.movieUrlQueryString = this.buildQueryString();
    this.getMovie();
  }

  public onSelectPrimaryReleaseYear(event: Date) {
    this.movieFilterFormGroup.patchValue({ primaryReleaseYear: event.getFullYear() })
  }

  public onSearch() {
    this.currentSearchSuggestionPage = 1;
    this.searchSuggestions$ = this.movieService.searchMovie(this.currentSearchSuggestionPage, this.searchValue);
  }

  public onSelectSearchSuggestion(event: MovieViewModel) {
    this.router.navigate([RouterConstants.getMovieDetailsPath(event.id)]);
  }

  private getMovie() {
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


  private buildForm() {
    this.movieFilterFormGroup = this.formBuilder.group(
      {
        primaryReleaseYear: new FormControl<number>(0),
        includeAdult: new FormControl<Boolean>(false),
        includeVideo: new FormControl<Boolean>(false),
        withGenres: new FormControl<string>('')
      }
    );
  }

  private buildQueryString(): string {
    let url = '';

    const keys = Object.keys(this.movieFilterFormGroup.controls).filter(key => {
      return this.movieFilterFormGroup.controls[key].value;
    });

    keys.forEach(k => {
      const queryString = FilterConstants.getQueryString(FilterConstants[k], this.movieFilterFormGroup.value[k].toString());
      url = url.concat(queryString);
    })
    
    return url;
  }
}
