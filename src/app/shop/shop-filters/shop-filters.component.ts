import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IBrand } from 'src/app/shared/Models/brand';
import { IType } from 'src/app/shared/Models/type';
import { ShopService } from '../shop.service';
import { ShopParams } from 'src/app/shared/Models/shopParams';
import { throws } from 'assert';

@Component({
  selector: 'app-shop-filters',
  templateUrl: './shop-filters.component.html',
  styleUrls: ['./shop-filters.component.scss']
})
export class ShopFiltersComponent implements OnInit {
  @Output() updateParams = new EventEmitter<boolean>();
  public brands : IBrand[];
  public types : IType[];
  shopParams : ShopParams;
  sortOptions =[
    {key : 1 , value :'عنوان'},
    {key : 2 , value : 'نوع محصول'},
    {key : 3 , value : 'قیمت'}
  ];
  sortTypeOptions = [
    {key : 1 , value : 'زیاد به کم'},
    {key : 2 , value : 'کم به زیاد'}
  ]

  constructor(private shopService : ShopService) { }

  ngOnInit(): void {
    this.shopParams = this.shopService.getShopParams();
    this.getBrands();
    this.getTypes();
  }
  onChangeTypes(typeId : number){
    this.shopParams.typeId = typeId
    this.shopService.updateShopParams(this.shopParams);
    this.updateParams.emit(true);
  }
  onChangeBrands(brandId : number){
    this.shopParams.BrandId = brandId;
    this.shopService.updateShopParams(this.shopParams);
    this.updateParams.emit(true);
  }
  onChangeSort(sort : number){
    this.shopParams.sort = sort;
    this.shopService.updateShopParams(this.shopParams);
    this.updateParams.emit(true);
  }
  onChangeTypeSort(typeSort : number){
    this.shopParams.typeSort = typeSort;
    this.shopService.updateShopParams(this.shopParams);
    this.updateParams.emit(true);
  }
  private getBrands(){
    const sub$ = this.shopService.getBrands().subscribe((res)=>{
      this.brands=res
    })
  }
  getTypes(){
    this.shopService.getTypes().subscribe((res)=>{
      this.types = res
    })
  }
}
