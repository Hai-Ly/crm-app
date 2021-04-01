import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { SharedModule } from '../shared';
import { HttpInterceptorProviders, TestHttpInterceptorProviders } from './interceptors';
import { ApiService, JwtService } from './services';
import { SearchComponent } from './components/search/search.component';
import { PropertyUpdateFormComponent } from './components/property-update-form/property-update-form.component';
import { AdminGuard, AuthGuard, NoAuthGuard, ResetPwdGuard } from './guards';
import { LayoutModule } from '@angular/cdk/layout';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { LoadingComponent } from './components/loading/loading.component';


@NgModule({
  declarations: [MainContainerComponent, SearchComponent, PropertyUpdateFormComponent, ConfirmComponent, LoadingComponent],
  imports: [
    SharedModule,
    LayoutModule
  ],
  providers: [
    //HttpInterceptorProviders,
    TestHttpInterceptorProviders,
    ApiService,
    JwtService,
    AdminGuard,
    AuthGuard,
    NoAuthGuard,
    ResetPwdGuard
  ],
  entryComponents: [
    PropertyUpdateFormComponent
  ],
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import Core modules in the AppModule only.');
    }
  }
}

