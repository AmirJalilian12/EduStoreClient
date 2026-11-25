import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket.service';
import { Observable } from 'rxjs';
import { IBasket, IBasketItems } from '../shared/Models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket$ : Observable<IBasket>;
  constructor(private basketService : BasketService ) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basketItems$;
  }
  increaseItemQuantity(item : IBasketItems){
    this.basketService.increaseItemQuantity(item.id).subscribe();
  }
decreaseItemQuantity(item: IBasketItems): void {
  this.basketService.decreaseItemQuantity(item.id).subscribe({
    next: (response) => {
      console.log('Decrease/delete result:', response);
    },
    error: (error) => {
      console.error('Basket update failed:', error);
    }
  });
}

}
