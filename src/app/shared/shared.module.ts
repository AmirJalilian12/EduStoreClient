import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardShopComponent } from './Components/card-shop/card-shop.component';
import { MatSidenavModule } from '@angular/material/sidenav'
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { OrderTotalComponent } from './Components/order-total/order-total.component';
import { InputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { StepperComponent } from './Components/stepper/stepper.component';
import { AddAddressCheckoutComponent } from './modals/add-address-checkout/add-address-checkout.component';
import { OrderDetailComponent } from './modals/order-detail/order-detail.component';
@NgModule({
  declarations: [
    CardShopComponent,
    OrderTotalComponent,
    InputComponent,
    StepperComponent,
    AddAddressCheckoutComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    PaginationModule,
    RouterModule,
    ReactiveFormsModule,
    MatStepperModule,
    ToastrModule.forRoot({
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
        progressBar: true,
        progressAnimation: 'increasing',
        timeOut: 5000,
    }),
    FormsModule
],
  exports : [CardShopComponent,MatSidenavModule,PaginationModule,ToastrModule , OrderTotalComponent,InputComponent,StepperComponent]
})
export class SharedModule { }
