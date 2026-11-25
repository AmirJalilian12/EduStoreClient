import { Component, OnDestroy, OnInit } from '@angular/core';
import { AcountService } from '../account/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit , OnDestroy {
  constructor(private accountService : AcountService) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

}
