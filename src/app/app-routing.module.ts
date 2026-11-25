import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/layers/not-found/not-found.component';
import { ServerErrorComponent } from './core/layers/server-error/server-error.component';
import { skip } from 'rxjs';
import { AuthGuard } from './core/guard/auth.guard';
import { MedicalModule } from './medical/medical.module';

const routes: Routes = [
  {
    path : '',
    title : 'صفحه اصلی',
    loadChildren :()=>import('./home/home.module').then(x=>x.HomeModule),
  },
  {
    path :'medical',
    title : 'داروها',
    loadChildren :()=>import('./medical/medical.module').then(x=>x.MedicalModule),
  },
  {
    path : 'account',
    title : 'ورود به سایت',
    loadChildren : ()=>import('./account/account.module').then(x=>x.AccountModule),
    data : { breadcrumb: {skip:true} }
  },
  {
    path : 'profile',
    canActivate : [AuthGuard],
    title : 'پنل کاربری',
    loadChildren : () => import('./profile/profile.module').then(x=>x.ProfileModule),
  },
  {
    path : 'checkout',
    canActivate : [AuthGuard],
    title : 'پرداخت',
    loadChildren : ()=>import('./checkout/checkout.module').then(x=>x.CheckoutModule),
    data : { breadcrumb : 'پرداخت' }
  },
  {
    path : 'basket',
    canActivate : [AuthGuard],
    title : 'سبد خرید',
    loadChildren : () => import('./basket/basket.module').then(x=>x.BasketModule),
    data : { breadcrumb : 'سبد خرید' }
  },
  {
    path : 'shop',
    title : 'محصولات',
    loadChildren :()=>import('./shop/shop.module').then(x=>x.ShopModule),
    data: { breadcrumb: 'محصولات' }
  },
  {
    path : 'notFound',
    component : NotFoundComponent,
  },
  {
    path : 'serverError',
    component : ServerErrorComponent,
  },
  {
    path : '**',
    title : 'صفحه مورد نظر یافت نشد',
    component : NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
