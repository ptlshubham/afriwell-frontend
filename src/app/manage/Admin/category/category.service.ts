import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Category } from './category.model';
import { Product } from './product.model';
import { QuantityWithSize } from './quantity.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveMainCat(admin: Category): Observable<any> {

        return this.httpClient.post<any>(ApiService.saveMainURL, admin);
    }
    GetFilterProduct(data: any) {
        return this.httpClient.post<any>(ApiService.getFilterProductListURL, data);
    }
    getProductDetailImages(id: any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getProductDetailImageURL, data);
    }
    getMainCat(id: any): Observable<Category[]> {

        return this.httpClient.get<any>(ApiService.getMainURL + id);
    }
    getCloth(): Observable<Category[]> {

        return this.httpClient.get<any>(ApiService.getClothsURL);
    }

    saveCat(admin: Category): Observable<any> {

        return this.httpClient.post<any>(ApiService.saveCatURL, admin);
    }
    // getCat(): Observable<Category[]>{
    //
    //   return this.httpClient.get<any>(ApiService.getCatURL);
    // }
    removeMainCatList(id: any) {

        return this.httpClient.get<any>(ApiService.removeMainCatURL + id);
    }
    updateMainCategory(admin: Category): Observable<any> {

        return this.httpClient.post<any>(ApiService.updateMainCatURL, admin);
    }
    updateMainCat(admin: Category): Observable<any> {

        return this.httpClient.post<any>(ApiService.updateCategoryURL, admin);
    }
    saveAddProduct(admin: Product): Observable<any> {

        return this.httpClient.post<any>(ApiService.saveProductsURL, admin);
    }
    saveBulkProduct(admin: any): Observable<any> {
        debugger
        return this.httpClient.post<any>(ApiService.saveBulkProductsUploadURL, admin);
    }
    saveBulkImages(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveBulkProductsImagesURL, admin)
    }
    selectUploadImage(img: any): Observable<any> {

        return this.httpClient.post<any>(ApiService.uploadMainImageURL, img);

    }
    selectMultiUploadImage(img: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.uploadMultiImageURL, img);
    }
    removeOrChanged() {
        return this.httpClient.get<any>(ApiService.removeImageURL);
    }
    uploadCategoryBannersImage(img: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.uploadCategoryBannersURL, img);
    }
    getProductMasterTag(): Observable<Product[]> {

        return this.httpClient.get<any>(ApiService.getProductMasterTagURL);
    }


}
