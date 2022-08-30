import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/modals/product.model';
import { Productlist } from 'src/app/modals/productlist.model';
import { CartService } from '../../shared/services/cart.service';
import { WishlistService } from '../../shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.sass']
})
export class WishlistComponent implements OnInit {

  public product: Observable<Product[]> = of([]);
  wishlistItems: Productlist[] = [];

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {
    // this.product = this.wishlistService.getWish();
    // this.product.subscribe(products => this.wishlistItems = products);
    this.getWishList();
  }

  ngOnInit() {
  }

  public addaToCart(product: Productlist, quantity: number = 1, i) {
    debugger
    product.productid = product.productid;
    debugger
    this.cartService.addToCart(product, quantity);
    this.wishlistService.removeWish(product.id).subscribe((req) => {
      this.wishlistItems.splice(i, 1);
    })
  }
  getWishList() {
    if (localStorage.getItem('userId') != undefined) {
      this.wishlistService.getWish().subscribe((data: any) => {
        this.wishlistItems = data;

      });
    }
    else {
      // if(localStorage.getItem('wish') != undefined){
      //   var test = localStorage.getItem('wish');
      //   var test2 = JSON.parse(test);
      //   var i=0;
      //     if(this.getCartList.length == 0){
      //       this.wishlistItems.push(test2);
      //     }
      //     else{
      //       this.wishlistItems.forEach(element =>{
      //         if(element.id == test2.id){
      //           i++;
      //         }
      //       })
      //     }
      //     if(i >0){
      //       this.wishlistItems.push(test2);
      //     }
      // }

    }

  }
  // Remove from wishlist
  public removeItem(index, id) {
    this.wishlistService.removeWish(id).subscribe((req) => {
      this.wishlistItems.splice(index, 1);
    })
  }

}
