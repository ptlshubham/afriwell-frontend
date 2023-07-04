import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { Productlist } from 'src/app/components/modals/productlist.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {

  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Input() product: any;
  isLogin:boolean=false;

  constructor(
    private cartService: CartService,
    public productsService: ProductService,
    private wishlistService: WishlistService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.isLogin = (localStorage.getItem('userId') != undefined) ? true : false;
    this.product;
  }

  // Add to cart
  public addToCart(product: Productlist, quantity: number = 1) {
    if(this.isLogin){
      this.cartService.addToCart(product, quantity);
      this.router.navigateByUrl('/widget-two', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/home/products/'+this.product.category+'/left-sidebar']);
      });
    }
    else{
      this.router.navigate(['/pages/my-account']);
    }
  }

  // Add to wishlist  
  public addToWishlist(product: Productlist) {
    this.product.userid = localStorage.getItem('userId');
    this.wishlistService.addToWishlist(product).subscribe((response) => {
      console.log(response);
    })
  }

  // Add to compare
  // public addToCompare(product: Product) {
  //   this.productsService.addToCompare(product);
  // }


  public openProductDialog(product) {
    let dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product,
      panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        this.router.navigate(['/products', product.id, product.productName]);
      }
    });
  }

}
