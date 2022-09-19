import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Userorders } from './orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private httpClient: HttpClient
  ) { }

  saveStatus(admin: Userorders): Observable<any> {
    return this.httpClient.post<any>(ApiService.updateOrdersStatusURL, admin);
  }

  getOrders(data:any): Observable<Userorders[]> {

    return this.httpClient.post<any>(ApiService.getOrdersListURL, data);
  }
  acceptOrder(id:any) {
    let data = {
      id: id
    }
    return this.httpClient.post<any>(ApiService.acceptUserOrderURL, data);
  }
}
