import { Component, Input, OnInit } from '@angular/core';
import { ShiprocketService } from 'src/app/shiprocket.service';

@Component({
  selector: 'app-courier-partners',
  templateUrl: './courier-partners.component.html',
  styleUrls: ['./courier-partners.component.sass']
})
export class CourierPartnersComponent implements OnInit {
  @Input() order: any;
  courierList: any = [];
  mpage: Number = 1;
  totalRec: string;
  constructor(
    private shiprocketService: ShiprocketService
  ) { }

  ngOnInit(): void {
    this.order;
    debugger
    this.getCourierListShipRocket();
  }
  getCourierListShipRocket() {
    this.order
    
    this.shiprocketService.getCourierServiceability(this.order).subscribe((data: any) => {
      debugger
      this.courierList = data.data.available_courier_companies;
      
       
    });
  }

}
