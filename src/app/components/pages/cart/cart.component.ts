import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/components/modals/cart-item';
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
  isLogin:boolean=false;
  constructor(private cartService: CartService) {
    this.getCart();
  }

  ngOnInit() {
  }

  getCart() {
    this.carttotal = 0;
    this.shoppingCartItems=[];
    if (localStorage.getItem('userId') != undefined) {
      debugger
      this.cartService.getCartList(localStorage.getItem('userId')).subscribe((data: any) => {
        if (data != 'empty') {
          this.isLogin=true;
          this.shoppingCartItems = data;
          this.getTotal();
        }
      });
    } else {
      let data = JSON.parse(localStorage.getItem('cartItem'));
      debugger
      this.shoppingCartItems = data;
      this.isLogin=false;
      if (this.shoppingCartItems != null) {
        this.getTotal();
      }

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
