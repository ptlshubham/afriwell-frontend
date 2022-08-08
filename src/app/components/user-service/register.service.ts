import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { UserRegister } from '../user-models/userRegister.model';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  constructor(
    private httpClient: HttpClient
  ) { }

  saveUserRegister(admin: UserRegister): Observable<any> {
    return this.httpClient.post<any>(ApiService.saveUserRegisterURL, admin);
  }
  login(data: UserRegister): Observable<any> {
    return this.httpClient.post<any>(ApiService.loginURl, data);
  }
}
