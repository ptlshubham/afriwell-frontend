import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { Product } from 'src/app/modals/product.model';
@Component({
  selector: 'app-product-vertical-food',
  templateUrl: './product-vertical-food.component.html',
  styleUrls: ['./product-vertical-food.component.sass']
})
export class ProductVerticalFoodComponent implements OnInit {

  contentLoaded = false;
  @Input() products: Product[];
 
   constructor(private productService: ProductService ) { }
 
   ngOnInit() {
     this.productService.getProducts()
     .subscribe(
      (product: Product[]) => {
        this.products = product.filter(item => item.type == 'food')
      }
    )
 
     setTimeout(() => {
       this.contentLoaded = true;
     }, 3000);
   }

}

