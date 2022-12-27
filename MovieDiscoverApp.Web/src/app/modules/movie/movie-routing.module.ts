import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieComponent } from './components/movie/movie.component';

const routes: Routes = [
  {
    path: "",
    component: MovieComponent,
    data: {
      breadcrumb: null
    }
  },
  {
    path: ":movieId",
    component: MovieDetailsComponent,
    data: {
      breadcrumb: 'Movie Details'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
