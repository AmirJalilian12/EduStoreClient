import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../Models/order';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AccountRoutingModule } from 'src/app/account/account-routing.module';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  order : IOrder ;
  constructor(public bsModalRef : BsModalRef) { }

  ngOnInit(): void {
  }

}
