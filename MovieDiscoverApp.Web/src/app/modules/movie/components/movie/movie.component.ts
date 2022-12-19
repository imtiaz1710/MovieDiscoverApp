import { Component, OnInit } from '@angular/core';
import { RouterConstants } from 'src/app/shared/constants/router-constants';
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
        this.movies = res.results;
      }
    })
  }

  generateMoviePosterFullUrl(fileName: string) {
    return `${RouterConstants.posterBaseUrl}/${fileName}`;
  }

  onPageChange(event: any){
    this.pageNo = event.page + 1;
    this.getMovie();
  }
}
