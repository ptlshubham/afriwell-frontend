import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/modals/cart-item';
import { ProductService } from '../../shared/services/product.service';
import { CheckoutService } from '../../shared/services/checkout.service';
import { Address } from '../../user-models/address.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

  public cartItems: Observable<CartItem[]> = of([]);
  public buyProducts: CartItem[] = [];
  public userAddress: Address[] = [];
  public state: any = [];

  carttotal: number = 0;
  totalItem: number = 0;
  qantWith: number = 0;
  amount: number;
  payments: string[] = ['Create an Account?', 'Flat Rate'];
  paymantWay: string[] = ['Direct Bank Transfer', 'PayPal'];
  contentLoaded = false;
  public addressModel: Address = new Address;
  selectedValue: string;
  isAddress: boolean = false;
  selectedAdd: number;

  constructor(
    private cartService: CartService,
    public productService: ProductService,
    private checkoutService: CheckoutService
  ) {
    this.getStateWithCity();
  }

  ngOnInit() {
    // this.cartItems = this.cartService.getItems();
    // this.cartItems.subscribe(products => this.buyProducts = products);
    // this.getTotal().subscribe(amount => this.amount = amount);
    setTimeout(() => {
      this.contentLoaded = true;
    }, 2000);
    this.getCart();
    this.getUserAddress();
  }
  getStateWithCity() {
    this.checkoutService.getState().subscribe((data: any) => {
      this.state = data;

    })
  }
  getUserAddress() {
    this.checkoutService.getAddress(localStorage.getItem('userId')).subscribe((data: any) => {
      this.userAddress = data;

    });
  }
  saveAddress() {

    this.addressModel.userid = localStorage.getItem('userId');

    // this.addressModel.state = this.selectedstate;
    this.checkoutService.saveUserAddress(this.addressModel).subscribe((response) => {
      this.getUserAddress();
      this.isAddress = false;
    })
  }
  getCart() {
    this.carttotal = 0;
    if (localStorage.getItem('userId') != undefined) {
      this.cartService.getCartList(localStorage.getItem('userId')).subscribe((data: any) => {
        this.buyProducts = data;
        this.getTotal();
      });
    }
  }
  selectedAddress(idn, id) {
    this.selectedAdd = id;
    if (this.userAddress[idn].selected == false) {

      this.userAddress[idn].selected = true;
      this.userAddress.forEach(element => {
        if (element.id != id) {
          element.selected = false;
        }
      })

    }
    else {
      this.userAddress[idn].selected = false;

    }

  }
  addNewOpen() {
    this.isAddress = true;
  }
  addNewClose() {
    this.isAddress = false;

  }
  public getTotal() {
    this.qantWith = 0;
    this.carttotal = 0;
    this.buyProducts.forEach(element => {
      this.qantWith = element.productPrice * element.quantity;
      this.carttotal = this.carttotal + this.qantWith;
    })
  }
  deleteAddress(id) {

  }
  placeOrder() {
    this.addressModel.userid = localStorage.getItem('userId');
    this.addressModel.username = localStorage.getItem('userName');
    this.addressModel.productid = this.buyProducts;
    this.addressModel.total = this.carttotal;
    this.addressModel.addressId = this.selectedAdd;
    this.addressModel.status = 'Pending';
    debugger
    this.cartService.saveOrders(this.addressModel).subscribe((data: any) => {
      this.removeItem();
      alert("order succesfully");
    })

  }
  public removeItem() {
    this.addressModel.productid.forEach(element => {
      if (element.id) {
        this.cartService.removeCart(element.id).subscribe((data: any) => {
        });
      }
      this.getCart();
      this.getTotal();

    });
  }

}
