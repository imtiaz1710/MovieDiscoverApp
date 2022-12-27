import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './components/movie/movie.component';
import { MovieRoutingModule } from './movie-routing.module';
import {PaginatorModule} from 'primeng/paginator';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import {AutoCompleteModule} from 'primeng/autocomplete';

@NgModule({
  declarations: [
    MovieComponent,
    MovieDetailsComponent
  ],
  imports: [
    CommonModule,
    PaginatorModule,
    MovieRoutingModule,
    CheckboxModule,
    CalendarModule,
    ReactiveFormsModule,
    MultiSelectModule,
    AutoCompleteModule
  ]
})
export class MovieModule { }
