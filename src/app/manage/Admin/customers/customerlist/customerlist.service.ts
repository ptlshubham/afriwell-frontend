import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerListService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCustomer(): Observable<[]> {

    return this.httpClient.get<any>(ApiService.getCustomerListURL);
  }
  //   updateRating(): Observable<any>{
  //      
  //     return this.httpClient.post<any>(ApiService.updatereviewsURL, admin);
  //   }
  removeRating(id:any) {
    return this.httpClient.get<any>(ApiService.removeReviewsURL + id);

  }

}


