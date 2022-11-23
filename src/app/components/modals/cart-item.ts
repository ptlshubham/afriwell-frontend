import { Product } from './product.model';
import { Productlist } from './productlist.model';

// cart items
export interface CartItem {
  product: Productlist ;
  quantity: number;
  userid: any;
  productPrice: number;
}

