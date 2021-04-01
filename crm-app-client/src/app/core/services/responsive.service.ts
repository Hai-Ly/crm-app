import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { ScreenSize } from '../models';



@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  /*
  private readonly breakpoints : { [ size : string ] : SwlBreakpoint } =
  {
      ["xs"] : {  screen:Screen.Mobile,
                  header: {wLogo: 'sixteen wide', wSearch: 'sixteen wide', wMenu:'sixteen wide', wLast: ''},
                  productList: {nColumn:1},
                  productDetail: {
                    sectionIntro: {wImg: 'sixteen wide', wIntro: 'sixteen wide'},
                    sectionInfo: {wTable: 'sixteen wide'}
                  }
                },


      ["sm"] : {  screen:Screen.Mobile,
                  header: {wLogo: 'sixteen wide', wSearch: 'sixteen wide', wMenu:'sixteen wide', wLast: ''},
                  productList: {nColumn:3},
                  productDetail: {
                    sectionIntro: {wImg: 'eight wide', wIntro: 'eight wide'},
                    sectionInfo: {wTable: 'sixteen wide'}
                  }
                },

      ["md"] : {  screen:Screen.Desktop,
                  header: {wLogo: 'two wide', wSearch: 'seven wide', wMenu:'four wide', wLast: 'three wide'},
                  productList: {nColumn:4},
                  productDetail: {
                    sectionIntro: {wImg: 'eight wide', wIntro: 'eight wide'},
                    sectionInfo: {wTable: 'eight wide'}
                  }
                },

      ["lg"] : {  screen:Screen.Desktop,
                  header: {wLogo: 'one wide', wSearch: 'eight wide', wMenu:'three wide', wLast: 'four wide'},
                  productList: {nColumn:5},
                  productDetail: {
                    sectionIntro: {wImg: 'eight wide', wIntro: 'eight wide'},
                    sectionInfo: {wTable: 'eight wide'}
                  }
                },

      ["xl"] : {  screen:Screen.Desktop,
                  header: {wLogo: 'one wide', wSearch: 'eight wide', wMenu:'three wide', wLast: 'four wide'},
                  productList: {nColumn:6},
                  productDetail: { sectionIntro: {wImg: 'eight wide', wIntro: 'eight wide'},
                  sectionInfo: {wTable: 'eight wide'}
                }
              },
  };*/

  private currentBreakpointSubject = new ReplaySubject<ScreenSize>(undefined);
  public currentBreakponitObservable = this.currentBreakpointSubject.asObservable();

  constructor( private breakpoints: BreakpointObserver) { 
    /**
     * Breakpoints.XSmall: max-width equals 599.99px
     * Breakpoints.Small: min-width equals 600px and max-width equals 959.99px
     * Breakpoints.Medium: min-width equals 960px and max-width equals 1279.99px
     * Breakpoints.Large: min-width equals 1280px and max-width equals 1919.99px
     * Breakpoints.XLarge: min-width equals 1920px
     */
    
    this.breakpoints.observe([ 
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge])
    .subscribe((state: BreakpointState) => {
      let t:ScreenSize = 0;
      if (state.breakpoints[Breakpoints.XSmall]) {
        console.log( 'Matches XSmall viewport');
        t = ScreenSize.XS;
      }
      if (state.breakpoints[Breakpoints.Small]) {
        console.log( 'Matches Small viewport');
        t = ScreenSize.SM;
      }
      if (state.breakpoints[Breakpoints.Medium]) {
        console.log( 'Matches Medium  viewport');
        t = ScreenSize.MD;
      }
      if (state.breakpoints[Breakpoints.Large]) {
        console.log( 'Matches Large viewport');
        t = ScreenSize.LG;
      }
      if (state.breakpoints[Breakpoints.XLarge]) {
        console.log( 'Matches XLarge viewport');   
        t = ScreenSize.XL;
      }
      
      if(t !== 0) {
        this.currentBreakpointSubject.next(t);
      }
    });
  }
}
