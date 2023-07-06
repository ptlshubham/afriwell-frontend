import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/components/modals/product.model';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { InventoryService } from 'src/app/manage/Admin/inventory/inventory.service';

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.sass']
})
export class PopularProductsComponent implements OnInit {

  public products: Product[];
  public product :   Product = {};
 
   constructor(
    private productsService: ProductService,
    private inventoryService:InventoryService
    ) { }
 
   ngOnInit() {
    
    let data = {
      filter: 'best'
    }
    this.inventoryService.getFilterProduct(data).subscribe((data: any) => {
      this.products = data;
      debugger
      // for (let i = 0; i < this.products.length; i++) {
      //   this.products[i].index = i + 1;
      // }
      // this.product.forEach(element => {
      //   this.inventoryService.getSize(element.id).subscribe((data: any) => {
      //     element.sizeList = data;
      //   })
      // });
    })
   }
}



