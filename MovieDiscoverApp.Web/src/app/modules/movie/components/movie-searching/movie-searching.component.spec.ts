import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSearchingComponent } from './movie-searching.component';

describe('MovieSearchingComponent', () => {
  let component: MovieSearchingComponent;
  let fixture: ComponentFixture<MovieSearchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieSearchingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieSearchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
