import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductLeftSidebarComponent } from './products/product-left-sidebar/product-left-sidebar.component';
import { HomeTwoComponent } from './home-two/home-two.component';
import { HomeThreeComponent } from './home-three/home-three.component';
import { HomeFourComponent } from './home-four/home-four.component';
import { HomeFiveComponent } from './home-five/home-five.component';
import { ProductRightSidebarComponent } from './products/product-right-sidebar/product-right-sidebar.component';
import { ProductNoSidebarComponent } from './products/product-no-sidebar/product-no-sidebar.component';
import { IndustrialComponent } from './industrial/industrial.component';
import { FoodComponent } from './food/food.component';
import { ProductDetailsFoodComponent } from './products/product-details-food/product-details-food.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { HomeDecorComponent } from './home-decor/home-decor.component';
import { ProductDetailsCenteredComponent } from './products/product-details-centered/product-details-centered.component';
import { Resolver } from '../shared/services/resolver.service';


// Routes
const routes: Routes = [
  { path: 'one', component: HomeComponent },
  { path: 'two', component: HomeTwoComponent },
  { path: 'three', component: HomeThreeComponent },
  { path: 'four', component: HomeFourComponent },
  { path: 'five', component: HomeFiveComponent },
  { path: 'industrial', component: IndustrialComponent },
  { path: 'food', component: FoodComponent },
  { path: 'furniture', component: FurnitureComponent },
  { path: 'home-decor', component: HomeDecorComponent },
  { path: 'products/:category/left-sidebar', component: ProductLeftSidebarComponent },
  { path: 'products/:category/right-sidebar', component: ProductRightSidebarComponent },
  { path: 'products/:category/no-sidebar', component: ProductNoSidebarComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'product/food/:id', component: ProductDetailsFoodComponent },
  { path: 'product/product-center/:id', component: ProductDetailsCenteredComponent },
  { path: 'product/product-center-name/:slug', component: ProductDetailsCenteredComponent,  resolve: {
    data: Resolver
  } },




];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
