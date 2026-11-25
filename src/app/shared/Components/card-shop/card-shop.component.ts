import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from '../../Models/product';

@Component({
  selector: 'app-card-shop',
  templateUrl: './card-shop.component.html',
  styleUrls: ['./card-shop.component.scss']
})
export class CardShopComponent implements OnInit {

  constructor(private basketService : BasketService) {}
  ngOnInit(): void {
  }
  @Input() product: IProduct;




  addItemToBasket(product: any) {
    this.basketService.addItemToBasket(this.product).subscribe((res)=>{
      console.log(res);
    });
  }

  viewProduct(product: any): void {
  }

  /** نمایش تصویر جایگزین در صورت خرابی لینک */
  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/placeholder.png';
  }
}
