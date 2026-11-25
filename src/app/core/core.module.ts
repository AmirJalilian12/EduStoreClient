
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RouterModule } from '@angular/router';

import { FooterComponent } from './layers/footer/footer.component';
import { NavbarComponent } from './layers/navbar/navbar.component';
import { NotFoundComponent } from './layers/not-found/not-found.component';
import { ServerErrorComponent } from './layers/server-error/server-error.component';
import { BreadcrumbComponent } from './layers/breadcrumb/breadcrumb.component';

import { BreadcrumbModule } from 'xng-breadcrumb';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ErrorHandlingInterceptor } from './Interceptors/error-handling.interceptor';
import { LoadingInterceptor } from './Interceptors/loading.interceptor';
import { AuthJWTTokenInterceptor } from './Interceptors/auth-jwttoken.interceptor';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    NotFoundComponent,
    ServerErrorComponent,
    BreadcrumbComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule,
    NgxSpinnerModule.forRoot({
      type: 'square-jelly-box'
    })
  ],

  exports: [
    FooterComponent,
    NavbarComponent,
    BreadcrumbModule,
    NgxSpinnerModule,
    BreadcrumbComponent
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthJWTTokenInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
