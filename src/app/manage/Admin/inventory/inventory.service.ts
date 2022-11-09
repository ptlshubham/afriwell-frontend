import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Product } from '../category/product.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
    private httpClient: HttpClient
  ) { }
  getProduct(): Observable<Product[]> {
    return this.httpClient.get<any>(ApiService.getAdminProductListURL);
  }
  getSize(id: any) {
    let data = {
      id: id
    }
    return this.httpClient.post(ApiService.GetSizeListURL, data);

  }
  getFilterProduct(data: any) {
    return this.httpClient.post<any>(ApiService.GetFilterProductsURL, data)
  }
  removeProduct(id: any) {
      
    return this.httpClient.get<any>(ApiService.removeProductListItemURL + id);
  }
  addToNewArrivals(data: any) {

    return this.httpClient.post(ApiService.addToNewArrivalsURL, data);

  }
  addToBestProduct(data: any) {
    return this.httpClient.post(ApiService.addToBestProductURL, data);

  }
  addTohotProduct(data: any) {
    return this.httpClient.post(ApiService.addToHotProductURL, data);
  }
  addToSale(data: any) {
    return this.httpClient.post(ApiService.addToOnSaleURL, data);
  }
  restokProductQuantity(data: any) {
    return this.httpClient.post(ApiService.addRestockQuantityURL, data);
  }
}
