import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { CheckoutService } from '../../shared/services/checkout.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.sass']
})
export class OrderlistComponent implements OnInit {
  ordersUser: any;
  public localUserId = localStorage.getItem('userId');
  constructor(
    private checkoutService: CheckoutService
  ) { }

  ngOnInit(): void {
    this.getOrdersForUser();
  }
  getOrdersForUser() {
    this.checkoutService.getUserOrders(this.localUserId).subscribe((data: any) => {
       
      this.ordersUser = data;
    });
  }

}
