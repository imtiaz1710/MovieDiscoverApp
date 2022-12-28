import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { RouterConstants } from 'src/app/shared/constants/router-constants';
import { MovieDetailsViewModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
// TODO: order all the ng life cycle hooks in the execution order
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit{
  movieId: string;
  movie$: Observable<MovieDetailsViewModel>;
  genres$: Observable<string>;
  productionCountries$: Observable<string>;
  spokenLanguages$: Observable<string>;

  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute) {
  }
  
  ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.paramMap.get('movieId');
    this.movie$ = this.movieService.getMovieDetailsById(this.movieId);
    this.genres$ = this.movie$?.pipe(map(m => m.genres.map(g => g.name).join(', ')));
    this.productionCountries$ = this.movie$.pipe(map(m => m.production_countries.map(c => c.name).join(', ')));
    this.spokenLanguages$ = this.movie$.pipe(map(m => m.spoken_languages.map(l => l.name).join(', ')));
  }

  getMovieImageUrl(posterPath){
    return RouterConstants.generateFullImageUrl(posterPath);
  }

  getProductionCompanyLogoUrl(fileName){
    return RouterConstants.generateFullImageUrl(fileName?.slice(1));
  }
}
