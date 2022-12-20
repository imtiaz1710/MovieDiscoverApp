import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


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
