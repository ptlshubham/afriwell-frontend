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
        loadChildren: () => import('./Admin/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./Admin/category/category.module').then(m => m.CategoryModule)
        // canActivate: [AuthGuard]
      },
      {
        path: 'emi',
        loadChildren: () => import('./Admin/emi/emi.module').then(m => m.EmiModule)
        // canActivate: [AuthGuard]
      },
      {
        path: 'orders',
        loadChildren: () => import('./Admin/orders/orders.module').then(m => m.OrdersModule)
        // canActivate: [AuthGuard]
      },
      {
        path: 'customers',
        loadChildren: () => import('./Admin/customers/customers.module').then(m => m.CustomersModule)
        // canActivate: [AuthGuard]
      },
      {
        path: 'reviews',
        loadChildren: () => import('./Admin/reviews/reviews.module').then(m => m.ReviewsModule)
        // canActivate: [AuthGuard]
      },
      {
        path: 'inventory',
        loadChildren: () => import('./Admin/inventory/inventory.module').then(m => m.InventoryModule)
        // canActivate: [AuthGuard]
      },
      {
        path: 'vendors',
        loadChildren: () => import('./Admin/vendors/vendors.module').then(m => m.VendorsModule)
        // canActivate: [AuthGuard]
      },
      {
        path: 'banners',
        loadChildren: () => import('./Admin/banners/banners.module').then(m => m.BannersModule)
        // canActivate: [AuthGuard]
      },
      {
        path: 'shipping',
        loadChildren: () => import('./Admin/shiprocket/shiprocket.module').then(m => m.ShiprocketModule)
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
        loadChildren: () => import('./Admin/pages/pages.module').then(m => m.PagesModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
