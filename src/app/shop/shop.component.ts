import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPagination } from '../shared/Models/pagination';
import { IProduct } from '../shared/Models/product';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/Models/brand';
import { IType } from '../shared/Models/type';
import { ShopParams } from '../shared/Models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit , OnDestroy {
  public data:IPagination<IProduct>;
  private sub$ = new Subscription();
  shopParams : ShopParams;
  sidenavOpen : boolean = true;
  @ViewChild('search' , {static : false}) searchTerm : ElementRef;

  constructor(private shopService : ShopService) { }
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
  ngOnInit(): void {
    this.onWindowResize();
    this.getProducts();
    this.shopParams = this.shopService.getShopParams();
  }

  @HostListener("window:resize")
  public onWindowResize(){
    window.innerWidth < 960 ? (this.sidenavOpen = false) : (this.sidenavOpen = true);
  }

  updateParams(updated : boolean){
    if(updated)
      this.getProducts();
  }
  private getProducts(){
    const sub$ = this.shopService.getProducts().subscribe((res)=>{
      this.data = res;
    });
    this.sub$.add(sub$);
  }
  onPageChange(data:any){
    this.shopParams.pageIndex = data.page;
    this.shopService.updateShopParams(this.shopParams);
    this.getProducts();
  }
  onSearch(){
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopService.updateShopParams(this.shopParams);
    this.getProducts();
  }
  onReset(){
    this.shopParams = new ShopParams();
    this.shopService.updateShopParams(this.shopParams);
    this.searchTerm.nativeElement.value = ''
    this.getProducts();
  }
}
