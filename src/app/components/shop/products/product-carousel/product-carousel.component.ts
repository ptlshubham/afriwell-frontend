import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Product } from 'src/app/components/modals/product.model';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductDialogComponent } from '../../products/product-dialog/product-dialog.component';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';
import { CoreService } from 'src/app/components/user-service/core.service';
import { Category } from 'src/app/manage/Admin/category/category.model';
import { Productlist } from 'src/app/components/modals/productlist.model';
import { InventoryService } from 'src/app/manage/Admin/inventory/inventory.service';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.sass']
})
export class ProductCarouselComponent implements OnInit {
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Input('product') product: Array<Category> = [];
  public config: SwiperConfigInterface = {};
  contentLoaded = false;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private productService: ProductService,
    private wishlistService: WishlistService,
    private inventoryService:InventoryService
  ) { }

  ngOnInit() {
    this.getCategoryList()
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
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      breakpoints: {
        20: {
          slidesPerView: 1
        },
        40: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
       3280: {
          slidesPerView: 8,
        },
      }
    }
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
  getCategoryList() {
    this.inventoryService.getProduct().subscribe((data: any) => {
      this.product = data;
      debugger
     });
  }
  // Add to cart
  //  public addToCart(product: Product,  quantity: number = 1) {
  //   this.cartService.addToCart(product,quantity);
  //   console.log(product, quantity);
  // }

  // Add to wishlist
  public addToWishlist(product: Productlist) {
    this.wishlistService.addToWishlist(product).subscribe((response) => {
      console.log(response);
    })
  }

  // Add to compare
  public addToCompare(product: Product) {
    this.productService.addToCompare(product);
  }
}



