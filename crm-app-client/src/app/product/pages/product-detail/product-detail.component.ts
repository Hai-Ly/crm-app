import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService, Product, User, ScreenSize} from '../../../core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ResponsiveService } from 'src/app/core/services/responsive.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'crm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  user$:Observable<User|undefined>;
  product$: Observable<Product>;
  breakPointSubscription: Subscription;
  introWithCarousel!: boolean;
  detailsColumns: string[] = ['name', 'value']
  constructor(private route: ActivatedRoute, private responsiveService:ResponsiveService, private productService: ProductService, private authService: AuthService) { 
    this.user$ = this.authService.currentUser;
    this.product$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.productService.getProduct(params.get('id')!);
      }));

    this.breakPointSubscription = this.responsiveService.currentBreakponitObservable.subscribe(
        (s:ScreenSize) => {
          this.introWithCarousel = s === ScreenSize.XS || s === ScreenSize.SM;
        });
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.productService.curProduct = undefined;
    if(this.breakPointSubscription) {
      this.breakPointSubscription.unsubscribe();
    }
  }

}
