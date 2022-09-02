import { Component, OnInit, Input } from '@angular/core';
import { UserHomeService } from 'src/app/components/user-service/home.services';
import { Productlist } from 'src/app/components/modals/productlist.model';

@Component({
  selector: 'app-product-vertical',
  templateUrl: './product-vertical.component.html',
  styleUrls: ['./product-vertical.component.sass']
})
export class ProductVerticalComponent implements OnInit {
  contentLoaded = false;
  @Input() products: Productlist[];
  public onSale: Productlist[];
  public hotProduct: Productlist[];

  constructor(
    private userHomeService: UserHomeService
  ) { }

  ngOnInit() {
    this.getbestProducts();
    this.getSaleProducts();
    this.getHotProducts();
    setTimeout(() => {
      this.contentLoaded = true;
    }, 3000);
  }
  getbestProducts() {
    this.userHomeService.getNewArrival().subscribe((data: any) => {
      this.products = data
    })
  }
  getSaleProducts() {
    this.userHomeService.getOnSaleProduct().subscribe((data: any) => {
      this.onSale = data

    })
  }
  getHotProducts() {
    this.userHomeService.getHotProduct().subscribe((data: any) => {
      this.hotProduct = data

    })
  }
}
