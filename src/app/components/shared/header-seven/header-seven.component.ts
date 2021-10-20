import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { CartItem } from 'src/app/modals/cart-item';
import { CartService } from '../services/cart.service';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-header-seven',
  templateUrl: './header-seven.component.html',
  styleUrls: ['./header-seven.component.sass']
})
export class HeaderSevenComponent implements OnInit {

  public currencies = ['USD', 'EUR'];
  public currency:any;
  public url : any;
  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg' },
    { name:'German', image: 'assets/images/flags/de.svg' },
    { name:'French', image: 'assets/images/flags/fr.svg' },
    { name:'Russian', image: 'assets/images/flags/ru.svg' },
    { name:'Turkish', image: 'assets/images/flags/tr.svg' }
  ]
  public flag:any;

  products: Product[];
  indexProduct: number;
  public sidenavMenuItems:Array<any>;
  shoppingCartItems: CartItem[] = [];

  constructor(private cartService: CartService, public router: Router) {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    } )
   }

  ngOnInit() {
    this.currency = this.currencies[0];
    this.flag = this.flags[0];
  }
  public changeCurrency(currency){
    this.currency = currency;
  }
  public changeLang(flag){
    this.flag = flag;
  }

}
