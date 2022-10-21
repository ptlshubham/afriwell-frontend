import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductLeftSidebarComponent } from './products/product-left-sidebar/product-left-sidebar.component';
import { ProductRightSidebarComponent } from './products/product-right-sidebar/product-right-sidebar.component';
import { ProductNoSidebarComponent } from './products/product-no-sidebar/product-no-sidebar.component';
import { ProductDetailsFoodComponent } from './products/product-details-food/product-details-food.component';
import { ProductDetailsCenteredComponent } from './products/product-details-centered/product-details-centered.component';
import { Resolver } from '../shared/services/resolver.service';
import { LandingComponent } from './landing/landing.component';
import { ProductListComponent } from './products/product-list/product-list.component';


// Routes
const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'products/:category/left-sidebar', component: ProductLeftSidebarComponent },
  { path: 'products/:category/right-sidebar', component: ProductRightSidebarComponent },
  { path: 'products/:category/no-sidebar', component: ProductNoSidebarComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'product/food/:id', component: ProductDetailsFoodComponent },
  { path: 'product/product-center/:id', component: ProductDetailsCenteredComponent },
  {
    path: 'product/product-center-name/:slug', component: ProductDetailsCenteredComponent, resolve: {
      data: Resolver
    }
  },




];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
