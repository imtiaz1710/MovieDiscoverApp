import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/modules/layout/layout/layout.component';


const routes: Routes = [
  { path: '', loadChildren: () => import('./shared/modules/layout/layout.module').then(x => x.LayoutModule), component: LayoutComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
