import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.sass']
})
export class OrderSuccessComponent implements OnInit {

  public paymantWay = [
    { title: 'Visa Debit Card', image: 'assets/images/flags/visa.png', card: '******6766' },
    { title: 'Mastercard Office', image: 'assets/images/flags/master.png', card: '******6766' },
    
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
