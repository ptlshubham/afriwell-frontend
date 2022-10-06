import { Component, OnInit } from '@angular/core';
import { ShiprocketService } from 'src/app/shiprocket.service';

@Component({
  selector: 'app-ship-orders',
  templateUrl: './ship-orders.component.html',
  styleUrls: ['./ship-orders.component.sass']
})
export class ShipOrdersComponent implements OnInit {
  ordersList: any = [];
  mpage: Number = 1;
  totalRec: string;
  constructor(
    private shiprocketService: ShiprocketService,
  ) {
    if (localStorage.getItem('shipToken') == undefined) {
      this.shiprocketService.loginShiprocket();
    } else {
      this.getOrdersShipRocket()
    }
  }

  ngOnInit(): void {
    this.getOrdersShipRocket()
  }

  getOrdersShipRocket() {
    this.shiprocketService.getAllOrderfromShiprocket().subscribe((data:any) => {
      this.ordersList = data.data;
      debugger
    });
  }


}
