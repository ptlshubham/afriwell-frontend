import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/components/modals/cart-item';
import { Productlist } from 'src/app/components/modals/productlist.model';
import { CartService } from '../../shared/services/cart.service';
import { ProductService } from '../../shared/services/product.service';
import { Webbanners } from '../../user-models/webhome.model';
import { UserHomeService } from '../../user-service/home.services';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit {

  products: Productlist[];
  public Banners: Webbanners[] = [];
  shoppingCartItems: CartItem[] = [];
  wishlistItems: Productlist[] = [];
  contentLoaded = false;
  public featuredProducts: Array<Productlist>;
  public onSaleProducts: Array<Productlist>;
  public topRatedProducts: Array<Productlist>;
  public newArrivalsProducts: Array<Productlist>;
  public slides = [];
  public dealbanners = [];
  public flashbanners = [];


  public baners = [
    // { title: "FURNITURE", subtitle: "Sale up to 30% off all products in the new collection.", image: "assets/images/product/furniture/baners/32.jpg" },
    // { title: "Lighting", subtitle: "Sale up to 30%.", image: "assets/images/product/furniture/baners/21.jpg" },
    // { title: "Clocks", subtitle: "Sale up to 30%.", image: "assets/images/product/furniture/baners/63.jpg" },
    // { title: "Accessories", subtitle: "Sale up to 20%.", image: "assets/images/product/furniture/baners/3.jpeg" },
    // { title: "Big offer on Accesories", subtitle: "Sale up to 20%.", image: "assets/images/product/furniture/baners/Furniture.png" }
  ]

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private userHomeService: UserHomeService,
  ) {
    this.getBanners();
  }

  ngOnInit() {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    this.productService.getProducts()
    // .subscribe(
    //   (product: Productlist[]) => {
    //     this.products = product.filter(item => item.type == 'furniture');
    //   }
    // )
    setTimeout(() => {
      this.contentLoaded = true;
    }, 3000);
  }
  getBanners() {
    this.slides = [];
    this.flashbanners = [];
    this.dealbanners = [];
    this.userHomeService.getWebSlider().subscribe((data: any) => {
      this.Banners = data;
      this.Banners.forEach(element => {
        if (element.name == 'Top') {
          let data = {
            image: 'http://localhost:8090' + element.bannersimage
          }
          this.slides.push(data);
        }
        else if (element.name == 'Deal Banners') {
          let data = {
            image: element.bannersimage,
            title: element.title,
            subtitle: element.subtitle
          }
          this.dealbanners.push(data);
        }
        else if (element.name == 'Flash Sale Banner') {
          let data = {
            image: element.bannersimage,
            title: element.title,
            subtitle: element.subtitle
          }
          this.flashbanners.push(data);
        }
        this.getMiddleBanner();
      })
    });
  }

  getMiddleBanner() {
    this.Banners.forEach(element => {
      if (element.name == 'Middle Left') {
        let data = {
          // title: 'Hello',
          // subtitle: 'Sub Title',
          image: 'http://localhost:8090' + element.bannersimage,
        }
        this.baners.push(data);
      }
      else if (element.name == 'Middle Right Down') {
        let data = {
          // title: 'Hello',
          // subtitle: 'Sub Title',
          image: 'http://localhost:8090' + element.bannersimage,
        }
        this.baners.push(data);
      }
      // else if (element.name == 'Middle Right Top') {
      //   let data = {
      //     // title: 'Hello',
      //     // subtitle: 'Sub Title',
      //     image: 'http://localhost:8090' + element.bannersimage,
      //   }
      //   this.baners.push(data);
      // }
    })
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
