import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from 'src/app/components/modals/cart-item';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Productlist } from 'src/app/components/modals/productlist.model';

@Component({
  selector: 'app-shopping-widgets-two',
  templateUrl: './shopping-widgets-two.component.html',
  styleUrls: ['./shopping-widgets-two.component.sass']
})
export class ShoppingWidgetsTwoComponent implements OnInit {

  products: Productlist[];
  indexProduct: number;
  carttotal: number = 0;
  totalItem: number = 0;
  qantWith: number = 0;
  isLogin:boolean=false;
  public sidenavMenuItems: Array<any>;
  @Input() shoppingCartsItems: CartItem[] = [];



  constructor(
    private cartService: CartService,
    public productService: ProductService
  ) {
    this.shoppingCartsItems
    if(this.shoppingCartsItems.length >0){

    }else{
      this.getCart();
    }
   
  }

  ngOnInit() {
  }
  public updateCurrency(curr) {
    this.productService.currency = curr;
  }



  getCart() {
    this.carttotal = 0;
    this.shoppingCartsItems=[];
    if (localStorage.getItem('userId') != undefined) {
      this.cartService.getCartList(localStorage.getItem('userId')).subscribe((data: any) => {
        debugger
        if (data != 'empty') {
          this.shoppingCartsItems = data;
          this.isLogin=true;
          debugger
          this.getTotal();
        }
      });
    } else {
      let data = JSON.parse(localStorage.getItem('cartItem'));
      debugger
      this.shoppingCartsItems = data;
      this.isLogin=false;
      if (this.shoppingCartsItems != null) {
        this.getTotal();
      }

    }
  }
  // Remove cart items
  public removeItem(id, ind) {
    if (localStorage.getItem('userId') == undefined) {
      this.shoppingCartsItems.splice(ind, 1);
      localStorage.removeItem('cartItem');
      this.getCart();
      this.getTotal();
    } else {
      this.cartService.removeCart(id).subscribe((data: any) => {
        this.getCart();
        this.getTotal();
      });
    }

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

  // // Decrease Product Quantity
  // public decrement(data) {
  //   if (data.quantity == 1) {
  //     this.totalItem = data.quantity - 1;
  //     data.quantity = this.totalItem;
  //     this.removeItem(data.id,1);
  //     this.getCart();
  //   }
  //   else {
  //     this.totalItem = data.quantity - 1;
  //     data.quantity = this.totalItem;
  //     this.cartService.updateCartDetails(data).subscribe((res: any) => {
  //       this.getCart();
  //       this.getTotal();
  //     });
  //   }
  // }
  // Get Total
  public getTotal() {
    this.qantWith = 0;
    this.carttotal = 0;
    if (this.shoppingCartsItems.length > 0) {
      this.shoppingCartsItems.forEach(element => {
        this.qantWith = element.productPrice * element.quantity;
        this.carttotal = this.carttotal + this.qantWith;
      })
    }

  }


}
