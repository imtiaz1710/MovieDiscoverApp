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
  pageNo: number = 1;
  totalResults: number = 0;
  
  moviePosterBaseUrl: string = `https://image.tmdb.org/t/p/w200`

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie() {
    this.movieService.getMovies(this.pageNo).subscribe({
      next: res => {
        this.pageNo = res.page;
        this.totalResults = res.total_results; 
        debugger
        this.movies = res.results;
      }
    })
  }

  generateMoviePosterFullUrl(fileName: string) {
    return `${this.moviePosterBaseUrl}/${fileName}`;
  }

  onPageChange(event: any){
    this.pageNo = event.page + 1;
    this.getMovie();
  }
}
