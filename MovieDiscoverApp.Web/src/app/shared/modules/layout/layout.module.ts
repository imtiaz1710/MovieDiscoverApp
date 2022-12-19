import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { LayoutRoutingModule } from './layout-routing.module';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
