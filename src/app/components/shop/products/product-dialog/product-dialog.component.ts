import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { Router } from '@angular/router';
import { Productlist } from 'src/app/modals/productlist.model';
import { CartItem } from 'src/app/modals/cart-item';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.sass']
})
export class ProductDialogComponent implements OnInit {

  public products: Productlist[] = [];
  public counter: number = 1;
  public variantImage: any = '';
  public selectedColor: any = '';
  public selectedSize: any = '';
  public shoppingCartsItems: CartItem[] = [];
  carttotal: number = 0;
  totalItem: number = 0;
  qantWith: number = 0;
  constructor(
    private router: Router,
    public productsService: ProductService,
    private cartService: CartService,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Productlist
  ) { }

  ngOnInit() {
    // this.productsService.getProducts().subscribe(product => this.products = product);

  }

  getCart() {
    this.carttotal = 0;
    if (localStorage.getItem('userId') != undefined) {
      this.cartService.getCartList(localStorage.getItem('userId')).subscribe((data: any) => {
        this.shoppingCartsItems = data;
        this.getTotal();
      });
    }
  }

  public addToCart(product: Productlist, quantity) {
    if (quantity == 0) return false;
    this.cartService.addToCart(product, parseInt(quantity));
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/widget-two', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  public removeItem(id) {
    this.cartService.removeCart(id).subscribe((data: any) => {
      this.getCart();
      this.getTotal();
    });
  }

  // Increase Product Quantity
  public increment(data) {
    this.totalItem = this.counter + 1;
    data.quantity = this.totalItem;
    this.counter = data.quantity;
    this.cartService.updateCartDetails(data).subscribe((res: any) => {
      this.getCart();
      this.getTotal();

    });

  }

  // Decrease Product Quantity
  public decrement(data) {
    if (data.quantity == 1) {
      this.totalItem = this.counter - 1;
      data.quantity = this.totalItem;
      this.counter = data.quantity;

      this.removeItem(data.id);
      this.getCart();
    }
    else {
      this.totalItem = this.counter - 1;
      data.quantity = this.totalItem;
      this.counter = data.quantity;

      this.cartService.updateCartDetails(data).subscribe((res: any) => {
        this.getCart();
        this.getTotal();
      });
    }
  }
  public getTotal() {
    this.qantWith = 0;
    this.carttotal = 0;
    this.shoppingCartsItems.forEach(element => {
      this.qantWith = element.productPrice * element.quantity;
      this.carttotal = this.carttotal + this.qantWith;
    })
  }
  public close(): void {
    this.dialogRef.close();
  }


  // Add to cart
  public buyNow() {
    this.router.navigate(['/home/product', this.product.id]);
    this.close();
  }

}
