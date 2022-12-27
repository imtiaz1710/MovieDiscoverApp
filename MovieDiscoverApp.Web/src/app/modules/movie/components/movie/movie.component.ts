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
  subscriptions: Subscription[] = [];
  movies: MovieViewModel[] = [];
  pageNo: number = 1;
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

  getGenre(){
    const subscriptionOfGetGenre = this.movieService.getGenres().subscribe({
      next: data => {
        this.genres = data;
      }
    })

    this.subscriptions.push(subscriptionOfGetGenre);
  }

  getMovie() {
    const subscriptionOfGetMovies = this.movieService.getMovies(this.pageNo, this.movieUrlQueryString).subscribe({
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

  onMovieClick(movieId: number){
    this.router.navigate([RouterConstants.getMovieDetailsPath(movieId)]);
  }

  onSelectPrimaryReleaseYear(event: Date){
    this.movieFilterFormGroup.patchValue({primaryReleaseYear: event.getFullYear()}) 
  }

  buildQueryString() {
    this.movieUrlQueryString = '';
    let queryString = '';
    
    Object.keys(this.movieFilterFormGroup.controls).forEach(key => {
      if(this.movieFilterFormGroup.controls[key].value){
        queryString = FilterConstants.getQueryString(FilterConstants[key], this.movieFilterFormGroup.value[key].toString());
        this.movieUrlQueryString = this.movieUrlQueryString.concat(queryString);
      }
    });
  }

  search(event) {
    this.movieService.searchMovie(1, event.query).subscribe(data => {
        this.results = data;
    });
  }
  
  onSelectSearchSuggestion(event: MovieViewModel){
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
