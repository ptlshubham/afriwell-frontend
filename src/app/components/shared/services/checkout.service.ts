import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Address } from '../../user-models/address.model';
import { Userorders } from '../../user-models/orders.model';

@Injectable({
    providedIn: 'root'
})
export class CheckoutService {
    constructor(
        private httpClient: HttpClient,
        private ApiService: ApiService
    ) { }

    //   getState(): Observable<State[]>{
    //     return this.httpClient.get<any>(ApiService.getStateListURL);
    //   }

    saveUserAddress(user: Address): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveUserAddressURL, user);
    }

    getState(): Observable<any> {
        return this.httpClient.get("./assets/data/state.json");

    }
    getAddress(id): Observable<Address> {
        return this.httpClient.get<any>(ApiService.getUserAddressURL + id);
    }
    removeAddress(id) {
        debugger
        return this.httpClient.post<any>(ApiService.removeUserAddressURL, id);
    }
    updateAddress(user) {
        return this.httpClient.post<any>(ApiService.updateUserAddressURL, user);
    }
    getUserOrders(id): Observable<Userorders[]> {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getOrdersForUserURL, data);
    }
}
