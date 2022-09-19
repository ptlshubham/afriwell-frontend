import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Emi } from './emi.model';

@Injectable({
  providedIn: 'root'
})
export class EmiService {

  constructor(
    private httpClient: HttpClient
  ) { }
  saveBankList(admin: Emi): Observable<any> {
    return this.httpClient.post<any>(ApiService.saveBankListURL, admin);
  }
  getBankList(): Observable<Emi[]> {
    return this.httpClient.get<any>(ApiService.getBankListURL);
  }
  addEmiOption(data:any) {
    return this.httpClient.post<any>(ApiService.saveEmioptionURL, data);
  }
  getRateOfIntrest(): Observable<Emi[]> {
    return this.httpClient.get<any>(ApiService.getROIListURL);
  }
  removeROIList(id:any) {
    let data = {
      id: id
    };
    return this.httpClient.post<any>(ApiService.removeROIListURL, data);
  }
}