import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/modals/cart-item';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  public cartItems: Observable<CartItem[]> = of([]);
  public shoppingCartItems: CartItem[] = [];
  carttotal: number = 0;
  totalItem: number = 0;
  qantWith: number = 0;
  constructor(private cartService: CartService) {
    this.getCart();
  }

  ngOnInit() {
  }

  getCart() {
    this.carttotal = 0;
    if (localStorage.getItem('userId') != undefined) {
      this.cartService.getCartList(localStorage.getItem('userId')).subscribe((data: any) => {
        this.shoppingCartItems = data;
        this.getTotal();
      });
    }
  }
  // Remove cart items
  public removeItem(id) {
    this.cartService.removeCart(id).subscribe((data: any) => {
      this.getCart();
      this.getTotal();
    });
  }

  // Increase Product Quantity
  public increment(data) {

    this.totalItem = data.quantity + 1;
    data.quantity = this.totalItem;
    this.cartService.updateCartDetails(data).subscribe((res: any) => {
      this.getCart();
      this.getTotal();

    });

  }

  // Decrease Product Quantity
  public decrement(data) {
    if (data.quantity == 1) {
      this.totalItem = data.quantity - 1;
      data.quantity = this.totalItem;
      this.removeItem(data.id);
      this.getCart();
    }
    else {
      this.totalItem = data.quantity - 1;
      data.quantity = this.totalItem;
      this.cartService.updateCartDetails(data).subscribe((res: any) => {
        this.getCart();
        this.getTotal();
      });
    }
  }
  // Get Total
  public getTotal() {
    this.qantWith = 0;
    this.carttotal = 0;
    this.shoppingCartItems.forEach(element => {
      this.qantWith = element.productPrice * element.quantity;
      this.carttotal = this.carttotal + this.qantWith;
    })
  }

}
