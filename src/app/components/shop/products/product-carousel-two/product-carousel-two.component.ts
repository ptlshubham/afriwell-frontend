import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Product } from 'src/app/components/modals/product.model';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductDialogComponent } from '../../products/product-dialog/product-dialog.component';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { UserHomeService } from 'src/app/components/user-service/home.services';
import { Productlist } from 'src/app/components/modals/productlist.model';

@Component({
  selector: 'app-product-carousel-two',
  templateUrl: './product-carousel-two.component.html',
  styleUrls: ['./product-carousel-two.component.sass']
})
export class ProductCarouselTwoComponent implements OnInit {
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Input('product') product: Array<Productlist> = [];
  public config: SwiperConfigInterface = {};
  contentLoaded = false;

  constructor(
    private cartService: CartService,
    private productsService: ProductService,
    private wishlistService: WishlistService,
    private dialog: MatDialog,
    private router: Router,
    private userHomeService: UserHomeService
  ) { }
  //  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  ngOnInit() {
    console.log(this.product);
    this.getNewArrivalsProducts();
    setTimeout(() => {
      this.contentLoaded = true;
    }, 3000);
  }
  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 5,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: true,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },


      }
    }
  }

  // Add to cart
  //  public addToCart(product: Product,  quantity: number = 1) {
  //    this.cartService.addToCart(product,quantity);
  //    console.log(product, quantity);
  //  }
  public addToCart(product: Productlist, quantity: number = 1) {
    this.cartService.addToCart(product, quantity);
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/widget-two', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  // Add to wishlist
  public addToWishlist(product: Productlist) {
    
    this.wishlistService.addToWishlist(product).subscribe((response) => {
      console.log(response);
    })
  }

  // Add to compare
  public addToCompare(product: Product) {
    this.productsService.addToCompare(product);
  }

  getNewArrivalsProducts() {
    this.userHomeService.getBestProduct().subscribe((data: any) => {
      this.product = data
    })
  }
  public openProductDialog(product) {
    let dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product,
      panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        this.router.navigate(['/products', product.id, product.name]);
      }
    });
  }
}
