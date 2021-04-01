import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductImageViewerComponent } from './components/product-image-viewer/product-image-viewer.component';
import { ProductCarouselComponent } from './components/product-carousel/product-carousel.component';
import { NguCarouselModule } from '@ngu/carousel';



@NgModule({
  declarations: [ProductDetailComponent, ProductImageViewerComponent, ProductCarouselComponent],
  imports: [
    SharedModule,
    ProductRoutingModule,
    NguCarouselModule,
  ]
})
export class ProductModule { }
