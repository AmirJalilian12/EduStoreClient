import { Component, OnDestroy, OnInit } from '@angular/core';
import { elementAt, Subscription } from 'rxjs';
import { AcountService } from 'src/app/account/account.service';
import { IAddress } from 'src/app/shared/Models/user';
import { CheckoutFormBuilderService } from '../checkout-form-builder.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AddAddressCheckoutComponent } from 'src/app/shared/modals/add-address-checkout/add-address-checkout.component';
@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit ,OnDestroy {
  sub$ = new Subscription();
  public addresses : IAddress[]=[];
  public indexAddressShipping = 0;
  constructor(private accountService : AcountService , private formBuiler  : CheckoutFormBuilderService , private bsModalRef : BsModalRef , private bsModalService : BsModalService) { }
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  ngOnInit(): void {
    this.getAddresses();
    this.formBuiler.$formBUilder.subscribe((res)=>{
      console.log(res);
    })
  }
  private getAddresses() {
    const sub = this.accountService.getAddresses().subscribe((res: IAddress[]) => {
      this.addresses = res;
      this.indexAddressShipping = res.findIndex((x)=> x.isMain);
      this.onChangeAddressShipping(this.indexAddressShipping);
    });
    this.sub$.add(sub);
  }
  setToMainAddress(index : number){
    this.indexAddressShipping = index;
  }
  onChangeAddressShipping(index : number){
    const address = this.addresses[index];
    this.indexAddressShipping = index;
    this.formBuiler.setAddress(address);
  }
AddNewAddress() {
  const initialState = {
  };
  this.bsModalRef = this.bsModalService.show(AddAddressCheckoutComponent , initialState);
  this.bsModalRef.content?.newAddress.subscribe((address)=>{
    this.checkAddressMain(address);
    this.addresses.push(address);
    this.onChangeAddressShipping(this.addresses.length-1);
  })

}
private checkAddressMain(address : IAddress){
  if(address.isMain){
    this.addresses.forEach((element)=>{
      if(element.id === address.id){
        element.isMain = true;
      }
      else {
        element.isMain = false;
      }
    })
  }
}

}
