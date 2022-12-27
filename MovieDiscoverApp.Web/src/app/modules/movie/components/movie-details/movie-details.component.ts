import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouterConstants } from 'src/app/shared/constants/router-constants';
import { MovieDetailsViewModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movieId: string;
  subscriptions: Subscription[] = [];
  movie: MovieDetailsViewModel;

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
        this.movie = res;
      }
    });

    this.subscriptions.push(subscriptionOfGetMovieDetails);
  }

  getMovieImageUrl(){
    return RouterConstants.generateFullImageUrl(this.movie?.poster_path);
  }

  getGenres(){
    return this.movie?.genres.map(g => g.name).toString();
  }

  getProductionCompanyLogoUrl(fileName){
    return RouterConstants.generateFullImageUrl(fileName?.slice(1));
  }

  getProductionCountries(){
    return this.movie?.production_countries.map(c => c.name).toString();
  }

  getSpokenLanguages(){
    return this.movie?.spoken_languages.map(c => c.name).toString();
  }
}
