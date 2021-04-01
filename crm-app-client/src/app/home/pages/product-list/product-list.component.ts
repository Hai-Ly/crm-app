import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Product, productDataTests, ScreenSize } from 'src/app/core/models';
import { ResponsiveService } from 'src/app/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'crm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = productDataTests;
  isScreenSmall$: Observable<boolean>;
  isScreenXLarge$: Observable<boolean>;
  nPages = 10;

  constructor(private responsiveService: ResponsiveService) {
    this.isScreenSmall$ = this.responsiveService.currentBreakponitObservable.pipe(map(s => s === ScreenSize.XS || s === ScreenSize.SM));
    this.isScreenXLarge$ = this.responsiveService.currentBreakponitObservable.pipe(map(s => s === ScreenSize.XL));
  }

  ngOnInit(): void {
    
  }

}
