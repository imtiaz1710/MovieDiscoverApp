import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Genre, MovieDetailsViewModel, MovieResponseModel, MovieViewModel } from '../models/movie.model';
import { RouterConstants } from 'src/app/shared/constants/router-constants';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) {
  }

  getMovies(pageNo: number, movieUrlExtensionString: string): Observable<MovieResponseModel>{
    const url = `/api/3/discover/movie?language=en-US&sort_by=popularity.desc&page=${pageNo}&with_watch_monetization_types=flatrate${movieUrlExtensionString}`;

    return this.http.get<MovieResponseModel>(url.trim());
  }

  getMovieDetailsById(movieId: string): Observable<MovieDetailsViewModel>{
    return this.http.get<MovieDetailsViewModel>(`/api/3/movie/${movieId}?&language=en-US`);
  }

  getGenres(): Observable<Genre[]>{
    return this.http.get<any>(`/api/3/genre/movie/list?language=en-US`).pipe(map(res => res.genres));
  }

  searchMovie(pageNo:number, searchText: string): Observable<MovieViewModel[]>{
    return this.http.get<MovieResponseModel>
      (`/api/3/search/movie?language=en-US&query=${searchText}&page=${pageNo}&include_adult=false`)
        .pipe(map(res => res.results));
  }
}
