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
  constructor() { }

  ngOnInit(): void {
  }
}
