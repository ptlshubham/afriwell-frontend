import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { OrdersService } from '../orders.service';
declare var require: any
declare var $: any;

@Component({
  selector: 'app-running',
  templateUrl: './running.component.html',
  styleUrls: ['./running.component.css']
})
export class RunningComponent implements OnInit {
  model!: Date;
  myForm: any;
  currentOrders: any = [];
  orderStatus: any = [];
  selectedStatus: any;
  Orderview: any = {};
  constructor(
    private ordersService: OrdersService,
    private apiservice: ApiService) {
    this.orderStatus = [
      {
        name: 'Pending'
      },
      {
        name: 'Processing',
      },
      {
        name: 'Completed',
      },
      {
        name: 'Cancelled',
      }
    ]
  }

  ngOnInit(): void {
    this.getRecentOrders();
  }
  getRecentOrders() {
    let data = {
      status: 'Accepted'
    }
    this.ordersService.getOrders(data).subscribe((data: any) => {
      this.currentOrders = data;
    });
  }
  viewOrdersDetails(data:any, ind:any) {

    this.Orderview = data;
  }
  selectOrderStatus(name:any) {
    this.orderStatus.forEach((element: { name: any; }) => {
      if (element.name == name) {
        this.selectedStatus = element.name;
      }
    })
  }
  saveOrderStatus() {
    let data = {
      id: this.Orderview.id,
      status: this.selectedStatus
    }
    this.ordersService.saveStatus(data).subscribe((req) => {
      // this.apiservice.showNotification('top', 'right', 'Status Change successfully.', 'success');
      this.getRecentOrders();
    })
  }
}
