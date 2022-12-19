import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from 'src/app/modules/movie/components/movie/movie.component';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  // {
  //   path: "",
  //   component: LayoutComponent
  // },
  {
    path: "movies",
    loadChildren: () => import('../../../modules/movie/movie.module').then(x => x.MovieModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
