import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages';
import { ProductListComponent } from './pages/product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children : [
      {path : '', redirectTo : 'products', pathMatch : 'full'},
      {
        path : 'products',
        children : [
          {path : '', component : ProductListComponent},
        ],
      },
    ]
  },
  // { path: 'contactus', component: ContactUsComponent},
  // { path: 'aboutus', component: AboutUsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {

}
