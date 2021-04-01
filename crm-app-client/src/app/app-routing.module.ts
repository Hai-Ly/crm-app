import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContainerComponent } from './core';


const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {
    path: '',
    component: MainContainerComponent,
    children: [
      { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
      { path: 'products', loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
    ]
  },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true,  enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
