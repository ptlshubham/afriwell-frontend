import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AdminLayoutComponent } from './Admin/layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './Admin/layouts/auth/auth-layout.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'pages/login',
    pathMatch: 'full',
  },

  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './Admin/dashboard/dashboard.module#DashboardModule',
        // canActivate: [AuthGuard]
      },
      {
        path: 'category',
        loadChildren: './Admin/category/category.module#CategoryModule',
        // canActivate: [AuthGuard]
      },
      {
        path: 'emi',
        loadChildren: './Admin/emi/emi.module#EmiModule',
        // canActivate: [AuthGuard]
      },
      {
        path: 'orders',
        loadChildren: './Admin/orders/orders.module#OrdersModule',
        // canActivate: [AuthGuard]
      },
      {
        path: 'customers',
        loadChildren: './Admin/customers/customers.module#CustomersModule',
        // canActivate: [AuthGuard]
      },
      {
        path: 'reviews',
        loadChildren: './Admin/reviews/reviews.module#ReviewsModule',
        // canActivate: [AuthGuard]
      },
      {
        path: 'inventory',
        loadChildren: './Admin/inventory/inventory.module#InventoryModule',
        // canActivate: [AuthGuard]
      },
      {
        path: 'vendors',
        loadChildren: './Admin/vendors/vendors.module#VendorsModule',
        // canActivate: [AuthGuard]
      },
      {
        path: 'banners',
        loadChildren: './Admin/banners/banners.module#BannersModule',
        // canActivate: [AuthGuard]
      },
    ]
  },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'pages',
        loadChildren: './Admin/pages/pages.module#PagesModule'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
