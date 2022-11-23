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
import { UserRegister } from '../../user-models/userRegister.model';
import { cashfreeService } from 'src/app/cashfree.service';
import { UserRegisterService } from '../../user-service/register.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  isPaymentDone:boolean = false;
  payments: string[] = ['Create an Account?', 'Flat Rate'];
  paymantWay: string[] = ['Direct Bank Transfer', 'PayPal', 'paytm', 'Razorpay', 'cashFree'];
  contentLoaded = false;
  public addressModel: Address = new Address;
  selectedValue: string;
  // isAddress: boolean = false;
  // selectedAdd: number;

  public localUserName = localStorage.getItem('userName');
  public localUserId = localStorage.getItem('userId');
  public localUserEmail = localStorage.getItem('Email');
  isAddress: boolean = false;
  selectedAdd: any;

  isShow: boolean = false;
  isLogin: boolean = false;
  showGift: boolean = false;
  isAddressOpen: boolean = false;
  isproductList: boolean = false;
  ispayment: boolean = false;
  isProductsum: boolean = false;
  isShowLogout: boolean = false;
  isSignup: boolean = false;
  loginModel: any = {};
  isAddNewAddClick:boolean = false;
  // selectedAdd: any;

  paymentResp:any;

  constructor(
    private cartService: CartService,
    public productService: ProductService,
    private checkoutService: CheckoutService,
    private router: Router,
    private shipService: ShiprocketService,
    private datePipe: DatePipe,
    private cashfreeservice:cashfreeService,
    private userRegisterService:UserRegisterService,
    private snackBar: MatSnackBar
  ) {
    this.getStateWithCity();
    this.getCart();
     
    if ( localStorage.getItem('userId') != undefined) {
       
      this.isLogin = true;
      this.getUserAddress();
    }
    else {
      this.isLogin = false;
    }
    // this.isSignup = false;
    this.isAddress = false;
    this.isShow=true;
    this.ispayment=true;

  }
  continueLoginUser(){
    this.loginModel
     
    this.userRegisterService.login(this.loginModel).subscribe(data => {
      let message, status;
      if (data.length > 0) {
        this.isLogin=true;
        this.isSignup=false;
        this.isAddress = true;
        this.isShowLogout = true;
        localStorage.setItem('Email', data[0].email);
        localStorage.setItem('userId', data[0].id);
        localStorage.setItem('userName', data[0].firstname + ' ' + data[0].lastname);
        localStorage.setItem('contactNo',data[0].contactnumber);
        this.localUserName = localStorage.getItem('userName');
        this.localUserId = localStorage.getItem('userId');
        this.localUserEmail = localStorage.getItem('Email');
        let data1 = JSON.parse(localStorage.getItem('cartItem'));
         
        this.cartService.addToCart(data1,1);
        this.getUserAddress();
        this.getCart();
      }
      else {
        message = 'Enter Valid User Email and password';
        status = 'danger';
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
      }
    });
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
  logoutUser(){
    this.router.navigate(['pages/my-account']);
  }
  addNewAdd(){
    this.isAddNewAddClick = !this.isAddNewAddClick;
  }
  selectaddress(idn, id) {
      
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
    debugger
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
  addAddress() {
    this.isShow = true;
  }

  addGiftCoupon() {
    this.showGift = true;
  }
  cancelGiftCard() {
    this.showGift = false;
  }
  getCart() {
    this.carttotal = 0;
    this.buyProducts=[];
    if (localStorage.getItem('userId') != undefined) {
      this.cartService.getCartList(localStorage.getItem('userId')).subscribe((data: any) => {
        if (data != 'empty') {
          this.buyProducts = data;
          this.getTotal();
        }
      });
    } else {
      let data = JSON.parse(localStorage.getItem('cartItem'));
      if(data != null){
        this.buyProducts = data;
        if (this.buyProducts != null) {
          this.getTotal();
        }
      }
    }
  }
  selectedaddress(data) {
    this.selectedAdd = data.name +' '+ data.address + ',' + data.landmark + ',' + data.city + ',' + data.state + ',' + data.pincode;
    this.isAddress = true;
    this.isProductsum = true;
    this.ispayment = true;


  }
  paymentSelect(val){
    this.isPaymentDone = true
      ;
    if(val =='cashfree'){
      let data={
        order_amount:this.carttotal,
        order_currency:'INR',
        customer_details: {
          customer_id: this.localUserId,
          customer_email: this.localUserEmail,
          customer_phone: localStorage.getItem('contactNo')
      },
     
      };
        
      this.cashfreeservice.CreateNewOrderPayment(data).subscribe((res:any)=>{
        this.paymentResp = JSON.parse(res);
        // window.location.href = this.paymentResp.payment_link;
       let data = window.open(this.paymentResp.payment_link, "_blank", "resizable=no, toolbar=no, scrollbars=no, menubar=no, status=no, directories=no, location=no, width=1000, height=600, left= 20; top=100 " );
          
      })
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
           
          if (res.order_id != undefined) {
            res.system_order_id = data.insertId;
             
            this.checkoutService.saveShiperocketData(res).subscribe((resp: any) => {
               
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
       
    })
  }
}
