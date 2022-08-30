import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Webbanners } from '../user-models/webhome.model';
import { ApiService } from 'src/app/api.service';
import { Productlist } from 'src/app/modals/productlist.model';
@Injectable({
  providedIn: 'root'
})
export class UserHomeService {


  constructor(
    private httpClient: HttpClient,


  ) { }
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  getWebSlider(): Observable<[Webbanners]> {
    return this.httpClient.get<any>(ApiService.getWebBannerURL);
  }
  getBestProduct(): Observable<Productlist[]> {
    return this.httpClient.get<any>(ApiService.getBestProductURL);
  }
  getNewArrival(): Observable<Productlist[]> {
    return this.httpClient.get<any>(ApiService.getNewArrivalURL);
  }
  getOnSaleProduct(): Observable<Productlist[]> {
    return this.httpClient.get<any>(ApiService.getSaleProductURL);
  }
  getHotProduct():Observable<Productlist[]>{
    return this.httpClient.get<any>(ApiService.getHotProductURL)
  }
}
