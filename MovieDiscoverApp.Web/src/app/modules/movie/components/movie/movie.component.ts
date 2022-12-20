import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { FilterConstants } from 'src/app/shared/constants/filter-constant';
import { RouterConstants } from 'src/app/shared/constants/router-constants';
import { MovieViewModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  // dateValue: Date | undefined;
  subscriptions: Subscription[] = [];
  movies: MovieViewModel[] = [];
  pageNo: number = 1;
  totalResults: number = 0;
  value: boolean = true;
  movieFilterFormGroup: FormGroup;
  movieUrlQueryString: string = "";

  constructor(private movieService: MovieService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
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
        this.totalResults = res.total_results;
        this.movies = res.results;
      }
    });

    this.subscriptions.push(subscriptionOfGetMovies);
  }

  generateMoviePosterFullUrl(fileName: string) {
    return `${RouterConstants.posterBaseUrl}/${fileName}`;
  }

  onPageChange(event: any) {
    this.pageNo = event.page + 1;
    this.getMovie();
  }

  onFilterButtonClick() {
    this.buildQueryString();
    this.getMovie();
  }

  buildForm() {
    this.movieFilterFormGroup = this.formBuilder.group(
      {
        primaryReleaseYear: new FormControl<number>(0),
        includeAdult: new FormControl<Boolean>(false),
        includeVideo: new FormControl<Boolean>(false) 
      }
    );
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

  onSelectPrimaryReleaseYear(event: Date){
    this.movieFilterFormGroup.patchValue({primaryReleaseYear: event.getFullYear()}) 
  }
}
