import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPagination } from '../shared/Models/pagination';
import { IProduct } from '../shared/Models/product';
import { map, Observable } from 'rxjs';
import { IBrand } from '../shared/Models/brand';
import { IType } from '../shared/Models/type';
import { MedicineParams, ShopParams } from '../shared/Models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
private backendUrl = environment.backendUrl;
private shopParams = new ShopParams();
private medicineParams = new MedicineParams()
  constructor(private http : HttpClient) { }
  

  getShopParams(){
    return this.shopParams;
  }
  updateShopParams(params :ShopParams){
    this.shopParams = params;
  }
  getProducts(): Observable<IPagination<IProduct>>{
    let params = this.generateShopParams();
    return this.http.get<IPagination<IProduct>>(this.backendUrl + '/products',{params});
  }
  private generateShopParams() {
    let params = new HttpParams();
    if (this.shopParams.search) params = params.append('search', this.shopParams.search);
    if (this.shopParams.BrandId && this.shopParams.BrandId > 0) params = params.append('brandId', this.shopParams.BrandId);
    if (this.shopParams.typeId && this.shopParams.typeId > 0) params = params.append('typeId', this.shopParams.typeId);
    params = params.append('pageIndex', this.shopParams.pageIndex);
    params = params.append('pageSize', this.shopParams.pageSize);
    params = params.append('sort', this.shopParams.sort);
    params = params.append('typeSort', this.shopParams.typeSort);
    return params;
  }
  private generateMedicineParams() {
  let params = new HttpParams();

  if (this.medicineParams.search)
    params = params.append('search', this.medicineParams.search);
  params = params.append('pageIndex', this.medicineParams.pageIndex);
  params = params.append('pageSize', this.medicineParams.pageSize);
  params = params.append('sort', this.medicineParams.sort);
  params = params.append('typeSort', this.medicineParams.typeSort);

  return params;
}
  getBrands(includeAll = true){
    return this.http.get<IBrand[]>(this.backendUrl +'/products/GetAllProductBrand').pipe(
      map((brands)=>{
        if(includeAll) brands = [{id:0 , title:'همه'}, ...brands];
          return brands;
      })
    );
  }
  getTypes(includeAll = true){
    return this.http.get<IType[]>(this.backendUrl +'/products/GetAllProductType').pipe(
      map((types)=>{
        if(includeAll) types = [{id:0 , title:'همه'}, ...types];
          return types;
      })
    )
  }
  getProduct(id:number){
    return this.http.get<IProduct>(`${this.backendUrl}/products/${id}`);
  }
}
