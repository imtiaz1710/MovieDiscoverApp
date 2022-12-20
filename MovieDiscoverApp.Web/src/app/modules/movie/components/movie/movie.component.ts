import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RouterConstants } from 'src/app/shared/constants/router-constants';
import { MovieViewModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  val: number = 0;
  subscriptions: Subscription[] = [];
  movies: MovieViewModel[] = [];
  pageNo: number = 1;
  totalResults: number = 0;
  value: boolean = true;

  constructor(private movieService: MovieService) {
  }
  
  ngOnInit(): void {
    this.getMovie();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getMovie() {
    const subscriptionOfGetMovies = this.movieService.getMovies(this.pageNo).subscribe({
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

  onPageChange(event: any){
    this.pageNo = event.page + 1;
    this.getMovie();
  }
}
