import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CompareComponent } from './compare/compare.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderlistComponent } from './orderlist/orderlist.component';




const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'about', component: AboutUsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'compare', component: CompareComponent },
      { path: 'my-account', component: MyAccountComponent },
      { path: 'error', component: ErrorPageComponent },
      { path: 'testimonials', component: ReviewsComponent },
      { path: 'order-success', component: OrderSuccessComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'order-list', component: OrderlistComponent }


    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
