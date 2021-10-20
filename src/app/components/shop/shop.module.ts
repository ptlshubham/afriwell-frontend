import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { MainCarouselComponentFood } from './food/main-carousel-food/main-carousel-food.component';
import { MainCarouselIndustrialComponent } from './industrial/main-carousel-industrial/main-carousel-industrial.component';
import { PriceComponent } from './products/price/price.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductDialogComponent } from './products/product-dialog/product-dialog.component';
import { ProductLeftSidebarComponent } from './products/product-left-sidebar/product-left-sidebar.component';
import { ProductVerticalComponent } from './products/product-vertical/product-vertical.component';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgxPaginationModule} from 'ngx-pagination';
import { HomeTwoComponent } from './home-two/home-two.component';
import { HomeThreeComponent } from './home-three/home-three.component';
// Import the library

import { from } from 'rxjs';
import { BrandsComponent } from './widgets/brands/brands.component';
import { CategoriesComponent } from './widgets/categories/categories.component';
import { PopularProductsComponent } from './widgets/popular-products/popular-products.component';
import { HomeFourComponent } from './home-four/home-four.component';
import { ProductZoomComponent } from './products/product-details/product-zoom/product-zoom.component';
import { ProductZoomFoodComponent } from './products/product-details-food/product-zoom-food/product-zoom-food.component';
import { HomeFiveComponent } from './home-five/home-five.component';
import { ProductNoSidebarComponent } from './products/product-no-sidebar/product-no-sidebar.component';
import { ProductRightSidebarComponent } from './products/product-right-sidebar/product-right-sidebar.component';
import { IndustrialComponent } from './industrial/industrial.component';
import { FoodComponent } from './food/food.component';
import { ProductTwoComponent } from './products/product-two/product-two.component';
import { ProductDetailsFoodComponent } from './products/product-details-food/product-details-food.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { CategoriesFurnitureComponent } from './widgets/categories-furniture/categories-furniture.component';
import { HomeDecorComponent } from './home-decor/home-decor.component';
import { ProductCarouselFourComponent } from './products/product-carousel-four/product-carousel-four.component';
import { ProductCarouselThreeComponent } from './products/product-carousel-three/product-carousel-three.component';
import { ProductCarouselComponent } from './products/product-carousel/product-carousel.component';
import { ProductCarouselTwoComponent } from './products/product-carousel-two/product-carousel-two.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ProductVerticalFoodComponent } from './products/product-vertical-food/product-vertical-food.component';
import { ProductDetailsLeftComponent } from './products/product-details-left/product-details-left.component';
import { ProductDetailsCenteredComponent } from './products/product-details-centered/product-details-centered.component';

@NgModule({
  declarations: [
    HomeComponent,
    MainCarouselComponent,
    MainCarouselComponentFood,
    MainCarouselIndustrialComponent,
    ProductsComponent,
    PriceComponent,
    ProductComponent,
    ProductDetailsComponent,
    ProductDialogComponent,
    ProductLeftSidebarComponent,
    ProductVerticalComponent,
    HomeTwoComponent,
    HomeThreeComponent,
    BrandsComponent,
    CategoriesComponent,
    PopularProductsComponent,
    HomeFourComponent,
    ProductZoomComponent,
    ProductZoomFoodComponent,
    HomeFiveComponent,
    ProductNoSidebarComponent,
    ProductRightSidebarComponent,
    IndustrialComponent,
    FoodComponent,
    ProductTwoComponent,
    ProductDetailsFoodComponent,
    FurnitureComponent,
    CategoriesFurnitureComponent,
    HomeDecorComponent,
    ProductCarouselFourComponent,
    ProductCarouselThreeComponent,
    ProductCarouselComponent,
    ProductCarouselTwoComponent,
    ProductVerticalFoodComponent,
    ProductDetailsLeftComponent,
    ProductDetailsCenteredComponent
    
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule
    // NgxImageZoomModule.forRoot() // <-- Add this line
  ],
  exports: [
    ProductDialogComponent,
    ProductZoomComponent,
    ProductZoomFoodComponent

  ],

  entryComponents:[
    ProductDialogComponent,
    ProductZoomComponent
  ],
})

export class ShopModule { }
