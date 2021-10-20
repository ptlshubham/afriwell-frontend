import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { CartItem } from 'src/app/modals/cart-item';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.sass']
})
export class FurnitureComponent implements OnInit {

  products: Product[];

  shoppingCartItems: CartItem[] = [];
  wishlistItems  :   Product[] = [];
  contentLoaded = false;
  public featuredProducts: Array<Product>;
  public onSaleProducts: Array<Product>;
  public topRatedProducts: Array<Product>;
  public newArrivalsProducts: Array<Product>;

  public slides = [
    { title: 'Huge sale', subtitle: 'Up to 70%', image: 'assets/images/carousel/banner1.jpg' },
    { title: 'Biggest discount', subtitle: 'Check the promotion', image: 'assets/images/carousel/banner2.jpg' },
    { title: 'Biggest sale', subtitle: 'Dont miss it', image: 'assets/images/carousel/banner3.jpg' },
    { title: 'Our best products', subtitle: 'Special selection', image: 'assets/images/carousel/banner4.jpg' },
  ];

  public baners =  [
    { title: "FURNITURE", subtitle: "Sale up to 30% off all products in the new collection.", image: "assets/images/product/furniture/baners/laptop.png" },
    { title: "Lighting", subtitle: "Sale up to 30%.", image: "assets/images/product/furniture/baners/tablet.png" },
    { title: "Clocks", subtitle: "Sale up to 30%.", image: "assets/images/product/furniture/baners/cameras.png" },
    { title: "Accessories", subtitle: "Sale up to 20%.", image: "assets/images/product/furniture/baners/mobiles.png" },
    { title: "Big offer on Accesories", subtitle: "Sale up to 20%.", image: "assets/images/product/furniture/baners/Furniture.png" }
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
