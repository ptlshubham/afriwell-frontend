import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of, Subscriber } from 'rxjs';
import { Productlist } from 'src/app/components/modals/productlist.model';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/api.service';

// Get product from Localstorage
let products = JSON.parse(localStorage.getItem("wishlistItem")) || [];

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  // wishlist array
  public wishlistProducts: BehaviorSubject<Productlist[]> = new BehaviorSubject([]);
  public observer: Subscriber<{}>;

  constructor(
    public snackBar: MatSnackBar,
    private ApiService: ApiService,
    private httpClient: HttpClient) { }

  // Get  wishlist Products
  public getProducts(): Observable<Productlist[]> {
    const itemsStream = new Observable(observer => {
      observer.next(products);
      observer.complete();
    });
    return <Observable<Productlist[]>>itemsStream;
  }


  // If item is aleready added In wishlist
  public hasProduct(product: Productlist): boolean {
    const item = products.find(item => item.id === product.id);
    return item !== undefined;
  }

  // Add to wishlist
  public addToWishlist(product: Productlist): Observable<any> {
    debugger
    let message, status;
    var item: Productlist;
    let data = {
      userid: localStorage.getItem('userId')
    }
    products.push(data);
    debugger
    if (this.hasProduct(products)) {
      item = products.filter(item => item.id === product.id)[0];
      const index = products.indexOf(item);
    } else {
      products.push(product);
    }
    message = 'The product ' + product.productName + ' has been added to wishlist.';
    status = 'success';
    this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    // localStorage.setItem("wishlistItem", JSON.stringify(products));
    return this.httpClient.post<any>(ApiService.saveAddToWishURL, product);

  }

  getWish(): Observable<Productlist[]> {
    return this.httpClient.get<any>(ApiService.getWishListURL);
  }
  // Removed Product
  public removeFromWishlist(product: Productlist) {
    if (product === undefined) { return; }
    const index = products.indexOf(product);
    products.splice(index, 1);
    localStorage.setItem("wishlistItem", JSON.stringify(products));
  }

  removeWish(id) {
    return this.httpClient.get<any>(ApiService.removeWishListItemURL + id);

  }
}
