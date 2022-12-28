import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RouterConstants } from 'src/app/shared/constants/router-constants';
import { MovieDetailsViewModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit{
  public movie$: Observable<MovieDetailsViewModel>;
  public genres$: Observable<string>;
  public productionCountries$: Observable<string>;
  public spokenLanguages$: Observable<string>;
  private movieId: string;

  public constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.paramMap.get('movieId');
    this.movie$ = this.movieService.getMovieDetailsById(this.movieId);
    this.genres$ = this.movie$?.pipe(map(m => m.genres.map(g => g.name).join(', ')));
    this.productionCountries$ = this.movie$.pipe(map(m => m.production_countries.map(c => c.name).join(', ')));
    this.spokenLanguages$ = this.movie$.pipe(map(m => m.spoken_languages.map(l => l.name).join(', ')));
  }

  public getMovieImageUrl(posterPath){
    return RouterConstants.generateFullImageUrl(posterPath);
  }

  public getProductionCompanyLogoUrl(fileName){
    return RouterConstants.generateFullImageUrl(fileName?.slice(1));
  }
}
