import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { AdminRegister } from './register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private httpClient: HttpClient
  ) { }

  saveAdmin(admin: AdminRegister): Observable<any> {
    return this.httpClient.post<any>(ApiService.saveAdminRegisterURL, admin);
  }
}
