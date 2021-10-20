import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { CartItem } from 'src/app/modals/cart-item';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-home-decor',
  templateUrl: './home-decor.component.html',
  styleUrls: ['./home-decor.component.sass']
})
export class HomeDecorComponent implements OnInit {
  contentLoaded = false;
  products: Product[];
  public banners = [];

  shoppingCartItems: CartItem[] = [];
  wishlistItems  :   Product[] = [];

  public featuredProducts: Array<Product>;
  public onSaleProducts: Array<Product>;
  public topRatedProducts: Array<Product>;
  public newArrivalsProducts: Array<Product>;

  public slides = [
    { title: 'Huge sale', subtitle: 'Up to 70%', image: 'assets/images/carousel/decor/banner1.jpg' },
    { title: 'Biggest discount', subtitle: 'Check the promotion', image: 'assets/images/carousel/decor/banner2.jpg' },
    { title: 'Biggest sale', subtitle: 'Dont miss it', image: 'assets/images/carousel/decor/banner3.jpg' },
    { title: 'Our best products', subtitle: 'Special selection', image: 'assets/images/carousel/decor/banner4.jpg' },
  ];


  public baners = [
    { 
      
      "title": "Headphone", 
      "subtitle": "Best bluetoot speakers ever. Don't miss it.",
      "image": "assets/images/background/baner_green.jpg" },
    { 
      "title": "Multimedia", 
      "subtitle1": ["Headphones", "Laptops", "Ipads", "smartphones", "Usb"], 
      "image": "assets/images/product/baners-decor/tablet.png" 
    },
    { "title": "Cosmetics", 
      "subtitle": ["Headphones", "Laptops", "Ipads", "smartphones", "Usb"], 
      "image": "assets/images/product/baners-decor/cosmetics.png" },
    { "title": "Home decors", "subtitle": ["Headphones", "Laptops", "Ipads", "smartphones", "Usb"
    ], 
      "image": 
      "assets/images/product/baners-decor/home.png" 
    },
    { 
      "title": "Electrics", 
      "subtitle": ["Headphones", "Laptops", "Ipads", "smartphones", "Usb"],
       "image": "assets/images/product/baners-decor/electrics.png" 
      }
  ]

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    this.productService.getProducts()
    .subscribe(
      (product: Product[]) => {
        this.products = product.filter(item => item.type == 'decor');
      }
    )
    this.productService.getBanners()
    .subscribe(
      data => this.banners = data
    );
    document.documentElement.style.setProperty('--theme-deafult', '#ef6c00');

    setTimeout(() => {
      this.contentLoaded = true;
    }, 3000);
  }

  public getBanner(index){
    return this.baners[index];
  }

  public getBgImage(index){
    let bgImage = {
      'background-image': index != null ? "url(" + this.baners[index].image + ")" : "url(https://via.placeholder.com/600x400/ff0000/fff/)"
    };
    return bgImage;
  }

}
