import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/components/modals/cart-item';
import { ProductService } from '../../shared/services/product.service';
import { CheckoutService } from '../../shared/services/checkout.service';
import { Address } from '../../user-models/address.model';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ShiprocketService } from 'src/app/shiprocket.service';
import { DatePipe } from '@angular/common';

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
  public selectedFullAddress: Address = new Address;
  carttotal: number = 0;
  totalItem: number = 0;
  qantWith: number = 0;
  amount: number;
  payments: string[] = ['Create an Account?', 'Flat Rate'];
  paymantWay: string[] = ['Direct Bank Transfer', 'PayPal', 'paytm', 'Razorpay', 'cashFree'];
  contentLoaded = false;
  public addressModel: Address = new Address;
  selectedValue: string;
  isAddress: boolean = false;
  selectedAdd: any;

  isShow: boolean = false;
  isLogin: boolean = true;
  showGift: boolean = false;
  isAddressOpen: boolean = false;
  isproductList: boolean = false;
  ispayment: boolean = false;
  isProductsum: boolean = false;
  isShowLogout: boolean = false;
  isSignup: boolean = false;
  loginModel: any = [];
  // selectedAdd: any;

  constructor(
    private cartService: CartService,
    public productService: ProductService,
    private checkoutService: CheckoutService,
    private router: Router,
    private shipService: ShiprocketService,
    private datePipe: DatePipe
  ) {
    this.getStateWithCity();

    if (localStorage.getItem('UserId') != null || localStorage.getItem('UserId') != undefined) {
      this.isLogin = true;
      this.getUserAddress();
    }
    else {
      this.isLogin = false;
    }
    this.isLogin = true;
    // this.isSignup = false;
    this.isAddress = false;
    this.isShow=true;
    this.ispayment=true;

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
    if (localStorage.getItem('shipToken') == undefined) {
      this.shipService.loginShiprocket();
    }

  }
  changeLoginUser() {
    this.isShowLogout = true;
    this.isAddress = true;
  }
  ContinueCheckout() {
    this.isAddress = false;
    this.isShowLogout = false;
    this.isAddress = false;
  }
  signupOpen() {

    this.isSignup = true;
    this.isLogin = true;
  }
  continueLoginUser(credentials) {
    console.log("......data...." + credentials.email);
    // this.loginService.login(credentials).subscribe(data => {

    //   if (data == 1) {
    //     this.apiservice.showNotification('top', 'right', 'Wrong Email!', 'danger');
    //   }
    //   else if (data == 2) {

    //     this.apiservice.showNotification('top', 'right', 'Wrong Password!', 'danger');

    //   }
    //   else {
    //     localStorage.setItem('authenticationToken', data[0].token);
    //     localStorage.setItem('UserId', data[0].id);
    //     localStorage.setItem('Email', data[0].email);
    //     localStorage.setItem('Username', data[0].firstname + ' ' + data[0].lastname);
    //     this.localUserEmail = localStorage.getItem('Email');
    //     this.localUserName = localStorage.getItem('Username');
    //     this.isLogin = true;
    //     this.getUserAddress();
    //   }

    // });
  }
  changeDilveryAddress() {
    this.isAddress = false;
    // this.selectedAdd = '';
  }
  cancelAddress() {
    this.isShow = false;
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
      this.selectedFullAddress = this.userAddress[idn];
      debugger
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
  deleteAddress(id) { }
  placeOrder() {
    let myDate: any = new Date();
    myDate = this.datePipe.transform(myDate, 'yyyy-MM-dd');
    this.addressModel.userid = localStorage.getItem('userId');
    this.addressModel.username = localStorage.getItem('userName');
    this.addressModel.productid = this.buyProducts;
    this.addressModel.total = this.carttotal;
    this.addressModel.addressId = this.selectedAdd;
    this.addressModel.status = 'Pending';
    let orderedItems: any = []
    if (this.buyProducts.length > 0) {
      this.buyProducts.forEach((element: any) => {
        let data = {
          name: element.productName,
          sku: element.productid,
          units: element.quantity,
          selling_price: element.productPrice,
          discount: element.discountPrice,
          tax: "",
          hsn: ''
        };
        orderedItems.push(data);
      })
    }

    this.cartService.saveOrders(this.addressModel).subscribe((data: any) => {


      if (data.insertId != null || data.insertId != undefined) {
        this.removeItem();
        alert("order succesfully");
        this.selectedFullAddress.country = 'India';
        let dataObj = {
          order_id: data.insertId,
          order_date: myDate,
          pickup_location: "primary",
          channel_id: "",
          comment: "",
          billing_customer_name: this.selectedFullAddress.name,
          billing_last_name: "",
          billing_address: this.selectedFullAddress.address,
          billing_address_2: "",
          billing_city: this.selectedFullAddress.city,
          billing_pincode: this.selectedFullAddress.pincode,
          billing_state: this.selectedFullAddress.state,
          billing_country: this.selectedFullAddress.country,
          billing_email: 'pranavgoswami38@gmail.com',
          billing_phone: this.selectedFullAddress.contactnumber,
          shipping_is_billing: true,
          shipping_customer_name: "",
          shipping_last_name: "",
          shipping_address: "",
          shipping_address_2: "",
          shipping_city: "",
          shipping_pincode: "",
          shipping_country: "",
          shipping_state: "",
          shipping_email: "",
          shipping_phone: "",
          order_items: orderedItems,
          payment_method: "Prepaid",
          shipping_charges: 0,
          giftwrap_charges: 0,
          transaction_charges: 0,
          total_discount: 0,
          sub_total: this.carttotal,
          length: 10,
          breadth: 15,
          height: 20,
          weight: 2.5
        };
        this.shipService.placingOrder(dataObj).subscribe((res: any) => {
          debugger
          if (res.order_id != undefined) {
            res.system_order_id = data.insertId;
            debugger
            this.checkoutService.saveShiperocketData(res).subscribe((resp: any) => {
              debugger
              this.router.navigate(['pages/order-success']);
            })
          }
        });
      }
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
  cancelOrder() {
    this.shipService.cancelOrder(264317748).subscribe((res: any) => {
      debugger
    })
  }
}
