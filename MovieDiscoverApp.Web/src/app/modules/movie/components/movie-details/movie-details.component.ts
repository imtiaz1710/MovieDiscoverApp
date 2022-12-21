import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movieId: string;
  subscriptions: Subscription[] = [];

  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.paramMap.get('movieId');
    this.getMovieDetails();
  }

  getMovieDetails(){
    let subscriptionOfGetMovieDetails = this.movieService.getMovieDetailsById(this.movieId).subscribe({
      next: res => {
      }
    });

    this.subscriptions.push(subscriptionOfGetMovieDetails);
  }
}
