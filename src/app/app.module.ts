import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoComponent } from './components/demo/demo.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxImgZoomModule } from 'ngx-img-zoom';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MainComponent } from './components/main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { ShopModule } from './components/shop/shop.module';
import { SharedModule } from './components/shared/shared.module';
import { ColorOptionsComponent } from './components/color-options/color-options.component';
import { ManageModule } from './manage/manage.module';
import { RouterModule } from '@angular/router';
import { EmiComponent } from './manage/Admin/emi/emi.component';
import { EmiModule } from './manage/Admin/emi/emi.module';
import { AdminLayoutComponent } from './manage/Admin/layouts/admin/admin-layout.component';
import { MainRoutes } from './components/main/main.routing';


@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    MainComponent,
    ColorOptionsComponent
  ],
  imports: [
    NgxSpinnerModule,
    BrowserModule,
    SharedModule,
    ShopModule,
    NgxSkeletonLoaderModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ManageModule,
    RouterModule,
    NgxImgZoomModule,
    RouterModule.forChild(MainRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
