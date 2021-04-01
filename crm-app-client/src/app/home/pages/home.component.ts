import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

import { Observable } from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { ResponsiveService, ScreenSize } from 'src/app/core';

// These constants are used by the ComponentSidenav for orchestrating the MatSidenav in a responsive
// way. This includes hiding the sidenav, defaulting it to open, changing the mode from over to
// side, determining the size of the top gap, and whether the sidenav is fixed in the viewport.
// The values were determined through the combination of Material Design breakpoints and careful
// testing of the application across a range of common device widths (360px+).
// These breakpoint values need to stay in sync with the related Sass variables in
// src/styles/_constants.scss.
const EXTRA_SMALL_WIDTH_BREAKPOINT = 720;
const SMALL_WIDTH_BREAKPOINT = 939;

@Component({
  selector: 'crm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isScreenSmall: Observable<boolean>;
  
  constructor(private responsiveService: ResponsiveService) {
    this.isScreenSmall = this.responsiveService.currentBreakponitObservable.pipe(map(s => s === ScreenSize.XS || s === ScreenSize.SM));
  }

  ngOnInit(): void {

  }
}
