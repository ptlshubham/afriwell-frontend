import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/modals/cart-item';
import { Product } from 'src/app/modals/product.model';
import { CartService } from '../../shared/services/cart.service';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit {

  products: Product[];

  shoppingCartItems: CartItem[] = [];
  wishlistItems: Product[] = [];
  contentLoaded = false;
  public featuredProducts: Array<Product>;
  public onSaleProducts: Array<Product>;
  public topRatedProducts: Array<Product>;
  public newArrivalsProducts: Array<Product>;

  public slides = [
    { image: 'assets/images/carousel/1.jpg' },
    { image: 'assets/images/carousel/2.jpg' },
    { image: 'assets/images/carousel/3.jpg' },
    { image: 'assets/images/carousel/4.jpg' },
  ];

  public baners = [
    { title: "FURNITURE", subtitle: "Sale up to 30% off all products in the new collection.", image: "assets/images/product/furniture/baners/32.jpg" },
    { title: "Lighting", subtitle: "Sale up to 30%.", image: "assets/images/product/furniture/baners/21.jpg" },
    { title: "Clocks", subtitle: "Sale up to 30%.", image: "assets/images/product/furniture/baners/63.jpg" },
    { title: "Accessories", subtitle: "Sale up to 20%.", image: "assets/images/product/furniture/baners/3.jpeg" },
    // { title: "Big offer on Accesories", subtitle: "Sale up to 20%.", image: "assets/images/product/furniture/baners/Furniture.png" }
  ]

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    this.productService.getProducts()
      .subscribe(
        (product: Product[]) => {
          this.products = product.filter(item => item.type == 'furniture');
        }
      )
    setTimeout(() => {
      this.contentLoaded = true;
    }, 3000);
  }



  public getBanner(index) {
    return this.baners[index];
  }

  public getBgImage(index) {
    let bgImage = {
      'background-image': index != null ? "url(" + this.baners[index].image + ")" : "url(https://via.placeholder.com/600x400/ff0000/fff/)"
    };
    return bgImage;
  }

}
