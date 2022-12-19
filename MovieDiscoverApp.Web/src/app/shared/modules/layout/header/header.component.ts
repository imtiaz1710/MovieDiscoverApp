import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterConstants } from 'src/app/shared/constants/router-constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit {
  isDataLoaded: boolean = false;
  isNavActive: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToMovies() {
    this.isNavActive = !this.isNavActive;
    this.router.navigate([`/${RouterConstants.movies}`]);
  }

  goToPeoples() {
    this.isNavActive = true;
  }
}
