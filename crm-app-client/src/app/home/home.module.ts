import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home.component';
import { SharedModule } from '../shared';
import { HomeRoutingModule } from './home-routing.module';
import { CategoryNavComponent } from './components/category-nav/category-nav.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ContextMenuModule } from 'ngx-contextmenu';


@NgModule({
  declarations: [HomeComponent, CategoryNavComponent, ProductListComponent],
  imports: [
    SharedModule,
    HomeRoutingModule,
    ContextMenuModule.forRoot(),
  ]
})
export class HomeModule { }
