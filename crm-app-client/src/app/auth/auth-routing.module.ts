import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoAuthGuard, ResetPwdGuard } from '../core/guards';
import { AuthComponent, SigninComponent, SignupComponent, ForgotPwdComponent, ResetPwdComponent } from './pages';

const authRoutes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            { path: 'signin', component: SigninComponent, canActivate: [NoAuthGuard]},
            { path: 'signup', component: SignupComponent, canActivate: [NoAuthGuard]},
            { path: 'forgotpwd', component: ForgotPwdComponent, canActivate: [NoAuthGuard]},
            { path: 'resetpwd', component: ResetPwdComponent, canActivate: [ResetPwdGuard]},
            { path: '', redirectTo: 'signin', pathMatch: 'full'}
        ]
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
