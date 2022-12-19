import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieResponseModel } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovies(pageNo: number): Observable<MovieResponseModel>{
    return this.http.get<MovieResponseModel>(`https://api.themoviedb.org/3/discover/movie?api_key=e97e8346683b49bfb765b16bf5c95c29&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNo}&with_watch_monetization_types=flatrate`)
  }
}
