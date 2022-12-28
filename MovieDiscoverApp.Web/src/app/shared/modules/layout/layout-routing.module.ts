import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from 'src/app/modules/movie/components/movie/movie.component';


const routes: Routes = [
  {
    path: "", loadChildren: () => import('../../../modules/movie/movie.module').then(x => x.MovieModule),
    data: { breadcrumb: null }
  },
  {
    path: "movies",
    loadChildren: () => import('../../../modules/movie/movie.module').then(x => x.MovieModule), data: { breadcrumb: null }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
