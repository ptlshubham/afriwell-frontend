import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItem } from 'src/app/components/modals/cart-item';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';
import { Productlist } from 'src/app/components/modals/productlist.model';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Address } from '../../user-models/address.model';

// Get product from Localstorage
let products = JSON.parse(localStorage.getItem("cartItem")) || [];

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Array
  public cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject([]);
  public observer: Subscriber<{}>;

  constructor(
    public snackBar: MatSnackBar,
    public ApiService: ApiService,
    private httpClient: HttpClient) {
    this.cartItems.subscribe(
      products => products = products
    );
  }

  // Get Products
  public getItems(): Observable<CartItem[]> {
    const itemsStream = new Observable(observer => {
      observer.next(products);
      observer.complete();
    });
    return <Observable<CartItem[]>>itemsStream;
  }

  // Add to cart
  public addToCart(product: Productlist, quantity: number) {
    debugger
    let message, status;
    var item: CartItem | boolean = false;
    // If Products exist
    let hasItem = products.find((items, index) => {
      if (items.product.productId == product.productId) {
        let qty = products[index].quantity + quantity;
        let stock = this.calculateStockCounts(products[index], quantity);
        if (qty != 0 && stock) {
          products[index]['quantity'] = qty;
          message = 'The product ' + product.productName + ' has been added to cart.';
          status = 'success';
          this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
        }
        return true;
      }
    });
    // If Products does not exist (Add New Products)
    if (!hasItem) {
      products = [];
      item = { product: product, quantity: quantity, userid: localStorage.getItem('userId'), productPrice: product.productPrice };
      products.push(item);
      if(localStorage.getItem('userId') == undefined){
        localStorage.setItem("cartItem", JSON.stringify(products));
        let   message = 'The product ' + products.product.productName + ' has been added to cart.';
        let status = 'success';
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
      }else{
        this.saveAddTocart(products);
      }
    }
    return item;
  }
  saveAddTocart(data) {
     
    this.httpClient.post<any>(ApiService.saveAddToCartURL, data).subscribe((res: any) => {
    let   message = 'The product ' + data[0].product.productName + ' has been added to cart.';
     let status = 'success';
      this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    });
  }
  updateCartDetails(data) {
    return this.httpClient.post<any>(ApiService.updateCartDetailsURL, data);
  }
  getCartList(id) {
    return this.httpClient.get<any>(ApiService.getCartListURL + id);
  }
  removeCart(id) {
    return this.httpClient.get<any>(ApiService.removeCartListItemURL + id);
  }
  // getCategory(id): Observable<Category[]> {
  //   return this.httpClient.get<any>(ApiService.getCategoryListURL + id);
  // }
  // getWish(): Observable<Wishlist[]> {

  //   return this.httpClient.get<any>(ApiService.getWishListURL);
  // }
  removeWish(id) {
    return this.httpClient.get<any>(ApiService.removeWishListItemURL + id);
  }
  // Calculate Product stock Counts
  public calculateStockCounts(product: CartItem, quantity): CartItem | Boolean {
    let message, status;
    let qty = product.quantity + quantity;
    let stock = product.product.stock;
    if (stock < qty) {
      // this.toastrService.error('You can not add more items than available. In stock '+ stock +' items.');
      this.snackBar.open('You can not choose more items than available. In stock ' + stock + ' items.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      return false
    }
    return true
  }





  // Removed in cart
  public removeFromCart(item: CartItem) {
    if (item === undefined) return false;
    const index = products.indexOf(item);
    products.splice(index, 1);
    localStorage.setItem("cartItem", JSON.stringify(products));
  }

  // Total amount
  public getTotalAmount(): Observable<number> {
    return this.cartItems.pipe(map((product: CartItem[]) => {
      return products.reduce((prev, curr: CartItem) => {
        return prev + curr.product.productPrice * curr.quantity;
      }, 0);
    }));
  }

  // Update Cart Value
  public updateCartQuantity(product: Productlist, quantity: number): CartItem | boolean {
    return products.find((items, index) => {
      if (items.product.id == product.id) {
        let qty = products[index].quantity + quantity;
        let stock = this.calculateStockCounts(products[index], quantity);
        if (qty != 0 && stock)
          products[index]['quantity'] = qty;
        localStorage.setItem("cartItem", JSON.stringify(products));
        return true;
      }
    });
  }

  saveOrders(user: Address): Observable<any> {
    return this.httpClient.post<any>(ApiService.saveUserOrdersURL, user);
  }
}
