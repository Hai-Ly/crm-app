import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthComponent } from './pages/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPwdComponent } from './pages/forgot-pwd/forgot-pwd.component';
import { ResetPwdComponent } from './pages/reset-pwd/reset-pwd.component';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    SigninComponent,
    SignupComponent,
    AuthComponent,
    ForgotPwdComponent,
    ResetPwdComponent
  ]
})
export class AuthModule { }
