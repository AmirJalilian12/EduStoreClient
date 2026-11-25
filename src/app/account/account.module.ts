import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderDetailComponent } from '../shared/modals/order-detail/order-detail.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
]
})
export class AccountModule { }
