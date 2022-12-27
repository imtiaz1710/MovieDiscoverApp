import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
  // TODO: please remove unused values and imports
import { RouterConstants } from 'src/app/shared/constants/router-constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit {
  // TODO: please remove unused values and imports
  isDataLoaded: boolean = false;
  // TODO: know more about truthy and falsy values of types. Default is always falsy of corresponding types if not assigned initially.
  isNavActive: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToMovies() {
    this.isNavActive = !this.isNavActive;
    this.router.navigate([``]);
  }

  goToPeoples() {
    this.isNavActive = true;
  }
}
