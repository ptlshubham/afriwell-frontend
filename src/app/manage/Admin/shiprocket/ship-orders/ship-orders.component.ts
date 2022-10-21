import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ShiprocketService } from 'src/app/shiprocket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ship-orders',
  templateUrl: './ship-orders.component.html',
  styleUrls: ['./ship-orders.component.sass']
})
export class ShipOrdersComponent implements OnInit {
  ordersList: any = [];
  mpage: Number = 1;
  totalRec: string;
  cancelArr: any = [];
  updateEmployeeModel: any
  orderDetails: any = {};
  detail: any = {};
  dimension: any;
  orderSelect: any;
  isOpen: boolean = false;
  constructor(
    private shiprocketService: ShiprocketService,
    private apiService: ApiService,
    @Inject(DOCUMENT) private document: Document
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
    this.shiprocketService.getAllOrderfromShiprocket().subscribe((data: any) => {
      this.ordersList = data.data;
    });
  }
  cancelOrderById(ids) {
    this.cancelArr = [];
    this.cancelArr.push(ids);
    Swal.fire({
      title: 'Are you sure you want to cancel this order?',
      text: "You can't undo this action.",
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      confirmButtonText: 'Yes, Cancel',
      buttonsStyling: false
    }).then((result) => {
      if (result.value == true) {
        this.shiprocketService.cancelOrder(this.cancelArr).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Order Successfully Cancelled.', 'success');

        })
        Swal.fire(
          {
            title: 'Cancelled!',
            text: 'Order Successfully cancelled..',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getOrdersShipRocket();
      }
    })
  }

  editOrderDetails(id) {
    this.shiprocketService.getOrderDeialsfromShiprocket(id).subscribe((data: any) => {
      this.orderDetails = data.data;
      this.dimension = this.orderDetails.others.dimensions.split('x');
      let data1 = {
        weight: this.orderDetails.shipments.weight,
        dimensions: this.dimension[0],
        dimensions1: this.dimension[1],
        dimensions2: this.dimension[2],
        payment_method: this.orderDetails.payment_method,
        customer_name: this.orderDetails.customer_name,
        customer_phone: this.orderDetails.customer_phone,
        customer_email: this.orderDetails.customer_email,
        company_name: this.orderDetails.company_name,
        customer_address: this.orderDetails.customer_address,
        customer_city: this.orderDetails.customer_city,
        customer_pincode: this.orderDetails.customer_pincode,
        customer_state: this.orderDetails.customer_state,
        customer_country: this.orderDetails.customer_country,
      }
      this.detail = data1;
      debugger

    })
  }
  generateInvoice(ids) {
    this.cancelArr = [];
    this.cancelArr.push(ids);
    this.shiprocketService.generateInvoice(this.cancelArr).subscribe((data: any) => {
      window.location.href = data.invoice_url;
      this.apiService.showNotification('top', 'right', 'Order Successfully Cancelled.', 'success');

    })
  }
  shipnowOpen(data) {
    this.isOpen = true;
    this.orderSelect = data;
  }
}
