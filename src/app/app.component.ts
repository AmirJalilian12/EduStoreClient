import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPagination } from './shared/Models/pagination';
import { IProduct } from './shared/Models/product';
import { ShopService } from './shop/shop.service';
import { Subscription } from 'rxjs';
import { BasketService } from './basket/basket.service';
import { IUser } from './shared/Models/user';
import { AcountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit , OnDestroy {

  private sub$ = new Subscription();

  title = 'EduStoreClient';
  constructor(private basketService : BasketService , private accountService : AcountService) {}
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this.getBasket();
    this.getCurrentUser();
  }

  private getCurrentUser() {
    const user = <IUser>JSON.parse(localStorage.getItem(environment.keySaveUser));
    if (user) {
      this.accountService.setCurrentUser(user);
    }
  }

  private getBasket() {
    const basketId = localStorage.getItem(environment.keyLocalStorageBasket);
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
