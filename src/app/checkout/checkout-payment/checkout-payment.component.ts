import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ToastrService } from 'ngx-toastr';
import { subscribe } from 'diagnostics_channel';
import { CheckoutFormBuilderService } from '../checkout-form-builder.service';
import { PortalTypeEnum } from 'src/app/shared/Models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {

  portalType = PortalTypeEnum;
  portalSelected = 3;
  transferToPortal = false;
  constructor(private orderService : OrderService , private toast : ToastrService , private formBuilder : CheckoutFormBuilderService , private router : Router) { }

  ngOnInit(): void {
    this.formBuilder.setPortalType(this.portalSelected);
  }
  onChangePortal(portalType : number){
    this.portalSelected = portalType;
    this.formBuilder.setPortalType(portalType);
  }
  createOrder(){
    this.transferToPortal = true;
    this.orderService.createOrder().subscribe((res)=>{
      if(res){
        if(res.authority){
          window.location.href = res.link;
        }
        else{
          this.transferToPortal = false;
          this.router.navigateByUrl('/checkout/success?status=failed');
        }
        // this.toast.success("پرداخت با موفقثیت انجام شد");
      }
    })
  }
}
