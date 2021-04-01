import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent, AdminProductComponent } from './pages';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children : [
            { path: '', redirectTo: 'products', pathMatch : 'full'},
            { path: 'products', component: AdminProductComponent},
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
