import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../shared/services/product.service';
import { CartItem } from 'src/app/modals/cart-item';

import { ProductDialogComponent } from './../products/product-dialog/product-dialog.component';
import { Router } from '@angular/router';
import { WishlistService } from '../../shared/services/wishlist.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.sass']
})
export class FoodComponent implements OnInit  {
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  products: Product[];
  shoppingCartItems: CartItem[] = [];
  contentLoaded = false;
  defaultFruits: Product[];


  public slides = [
    { title: 'THE BEST CHOICE IS HERE', subtitle: 'New Arrivals On Sale', image: 'assets/images/carousel/food/banner1.jpg' },
    { title: 'Biggest discount', subtitle: 'Check the promotion', image: 'assets/images/carousel/food/banner2.jpg' },
    { title: 'Biggest sale', subtitle: 'Dont miss it', image: 'assets/images/carousel/food/banner3.jpg' },

  ];

  public blog = [{
    image: 'assets/images/galery/gal-1.jpeg',
    date: '25 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/galery/gal-2.jpeg',
    date: '26 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/galery/gal-3.jpeg',
    date: '27 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/galery/gal-5.jpeg',
    date: '28 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
}, {
  image: 'assets/images/galery/gal-6.jpeg',
  date: '28 January 2018',
  title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
  by: 'John Dio'
}, {
  image: 'assets/images/galery/gal-7.jpeg',
  date: '28 January 2018',
  title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
  by: 'John Dio'
}, {
  image: 'assets/images/galery/gal-8.jpeg',
  date: '28 January 2018',
  title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
  by: 'John Dio'
}, {
  image: 'assets/images/galery/gal-9.jpeg',
  date: '28 January 2018',
  title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
  by: 'John Dio'
}]

  constructor(private productService: ProductService, private wishlistService: WishlistService, private cartService: CartService, private dialog: MatDialog, private router: Router) { }

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
