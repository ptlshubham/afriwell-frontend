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
  ) {
    this.products;
    this.getbestProducts();
    this.getSaleProducts();
    this.getHotProducts();
   
      
  }

  ngOnInit() {
    setTimeout(() => {
      this.contentLoaded = true;
   
    }, 3000);
  
  }
  getbestProducts() {
    this.userHomeService.getNewArrival().subscribe((data: any) => {
      if( data.length >0){
        this.products = data
      }else{
        this.products=[];
      }
    })
  }
  getSaleProducts() {
    this.userHomeService.getOnSaleProduct().subscribe((data: any) => {
        
      if( data.length >0){
        this.onSale = data
      }else{
        this.onSale=[];
      }
      
    })
  }
  getHotProducts() {
    this.userHomeService.getHotProduct().subscribe((data: any) => {
      if(data.length >0){
        this.hotProduct = data
      }else{
        this.hotProduct=[];
      }
    })
  }
}
