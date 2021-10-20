import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';
import { CartItem } from 'src/app/modals/cart-item';
import { Product } from 'src/app/modals/product.model';

@Component({
  selector: 'app-industrial',
  templateUrl: './industrial.component.html',
  styleUrls: ['./industrial.component.sass']
})
export class IndustrialComponent implements OnInit {
  public banners = [];
  products: Product[];
  shoppingCartItems: CartItem[] = [];
  contentLoaded = false;
  public slides = [
    { title: 'THE BEST CHOICE IS HERE', subtitle: 'New Arrivals On Sale', image: 'assets/images/carousel/banner1.jpg' },
    { title: 'Biggest discount', subtitle: 'Check the promotion', image: 'assets/images/carousel/banner1.jpg' },
    { title: 'Biggest sale', subtitle: 'Dont miss it', image: 'assets/images/carousel/banner1.jpg' },

  ];

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.productService.getBanners()
    .subscribe(
      data => this.banners = data
    );

    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    
    this.productService.getProducts()
    .subscribe(
      (product: Product[]) => {
      this.products = product.filter(item => item.type == 'industrial');
      }
    )
    setTimeout(() => {
      this.contentLoaded = true;
    }, 3000);
  }

}

// this.productService.getProducts()
// .subscribe(
//   (response => {
//   this.products = response.filter(item => item.type == 'industrial');
//   }
// )