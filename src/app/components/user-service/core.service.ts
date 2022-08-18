import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Category } from 'src/app/manage/Admin/category/category.model';
import { UserRegister } from '../user-models/userRegister.model';

@Injectable({
    providedIn: 'root'
})
export class CoreService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getAllUserCate(id): Observable<Category[]> {

        return this.httpClient.get<any>(ApiService.getCategoryListURL + id);
    }
}
