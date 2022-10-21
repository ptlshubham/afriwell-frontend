import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './api.service';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class cashfreeService {

    constructor(
        private http: HttpClient,
      ) {}
      httpOption = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    CreateNewOrderPayment(data){
        debugger
         return this.http.post(ApiService.createCashfreeOrderURL,data);
    }
}