import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { AdminRegister } from '../register/register.model';

@Injectable({
    providedIn: 'root'
})
export class LoginService {


    constructor(
        private httpClient: HttpClient
    ) { }
    login(credentials: AdminRegister): Observable<any> {
        debugger
        const data = {
            email: credentials.email,
            password: credentials.password
        };
        return this.httpClient.post<any>(ApiService.saveAdminLoginURL, data);
    }
}
