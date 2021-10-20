import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/modals/cart-item';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header-five',
  templateUrl: './header-five.component.html',
  styleUrls: ['./header-five.component.sass']
})
export class HeaderFiveComponent implements OnInit {
  public sidenavMenuItems:Array<any>;

  public currencies = ['USD', 'EUR'];
  public currency:any;
  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg' },
    { name:'German', image: 'assets/images/flags/de.svg' },
    { name:'French', image: 'assets/images/flags/fr.svg' },
    { name:'Russian', image: 'assets/images/flags/ru.svg' },
    { name:'Turkish', image: 'assets/images/flags/tr.svg' }
  ]
  public flag:any;




  public shoppingCartItems: CartItem[] = [];


  constructor(private cartService: CartService) {
    this.cartService.getItems().subscribe(shoppingCartItems =>
      {
      this.shoppingCartItems = shoppingCartItems
    }
    );
  }

  ngOnInit() {

  }



}