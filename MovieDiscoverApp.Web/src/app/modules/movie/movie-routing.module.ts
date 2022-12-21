import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieComponent } from './components/movie/movie.component';



const routes: Routes = [
  {
    path: "",
    component: MovieComponent,
    data: {breadcrumbs: 'Movies'}
  },
  {
    path: ":movieId",
    component: MovieDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
