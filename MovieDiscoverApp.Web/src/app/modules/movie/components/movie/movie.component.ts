import { Component, OnInit } from '@angular/core';
import { MovieViewModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movies: MovieViewModel[] = [];
  pageNo: number= 0;
  moviePosterBaseUrl: string = `https://image.tmdb.org/t/p/w200`

  constructor(private movieService: MovieService) {
   }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(){
    this.movieService.getMovies(1).subscribe({
      next: res => {
        res.page = this.pageNo;
        this.movies = res.results;
      }
    })
  }

  generateMoviePosterFullUrl(fileName: string){
    return `${this.moviePosterBaseUrl}/${fileName}`;
  }
}
