import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieDetailsViewModel, MovieResponseModel } from '../models/movie.model';
import { RouterConstants } from 'src/app/shared/constants/router-constants';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }

  getMovies(pageNo: number, movieUrlExtensionString: string): Observable<MovieResponseModel>{
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=e97e8346683b49bfb765b16bf5c95c29&language=en-US&
      sort_by=popularity.desc&include_video=false&page=${pageNo}&with_watch_monetization_types=flatrate${movieUrlExtensionString}`;
      
    return this.http.get<MovieResponseModel>(url.trim());
  }

  getMovieDetailsById(movieId: number): Observable<MovieDetailsViewModel>{
    return this.http.get<MovieDetailsViewModel>(`https://api.themoviedb.org/3/movie/%${movieId}?api_key=${RouterConstants.apiKey}&language=en-US`)
  }
}
