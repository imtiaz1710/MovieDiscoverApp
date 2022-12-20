import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './components/movie/movie.component';
import { MovieRoutingModule } from './movie-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {PaginatorModule} from 'primeng/paginator';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MovieComponent
  ],
  imports: [
    CommonModule,
    PaginatorModule,
    MovieRoutingModule,
    CheckboxModule,
    CalendarModule,
    ReactiveFormsModule
  ]
})
export class MovieModule { }
