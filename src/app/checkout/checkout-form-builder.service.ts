import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAddress, ICheckoutFormBuilder } from '../shared/Models/user';
import { IDeliveryMethod } from '../shared/Models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormBuilderService {
  private formBUilder = new BehaviorSubject<ICheckoutFormBuilder>(null);
  public $formBUilder = this.formBUilder.asObservable();
  constructor() { }
  setAddress(address : IAddress){
    this.formBUilder.next({...this.formBUilder.value , address});
  }
  setDeliveryMethod(deliveryMethod : IDeliveryMethod){
    this.formBUilder.next({...this.formBUilder.value,deliveryMethod})
  }
  setPortalType(portalType : number){
    this.formBUilder.next({...this.formBUilder.value ,portalType});
  }
}
