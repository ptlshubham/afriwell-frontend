import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DemoComponent } from './components/demo/demo.component';

const appRoutes: Routes = [
  {

    path: '',
    redirectTo: 'home/landing',
    pathMatch: 'full'
  },


  {
    path: 'home',
    component: DemoComponent
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./components/shop/shop.module').then(m => m.ShopModule)
      },
      {
        path: 'pages',
        loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule)

      },
      {
        path: 'blog',
        loadChildren: () => import('./components/blog/blog.module').then(m => m.BlogModule)
      },
      // {
      //   path: 'emi',
      //   loadChildren: () => import('./manage/Admin/emi/emi.module').then(m => m.EmiModule)
      // },
      // {
      //   path: 'manage',
      //   loadChildren: () => import('./manage/manage.module').then(m => m.ManageModule)
      // },
      // {
      //   path: 'pages',
      //   loadChildren: () => import('./manage/Admin/pages/pages.module').then(m => m.PagesModule)
      // }
    ]
  },
  // {
  //   path: '',
  //   component: AdminLayoutComponent,
  //   children: [
  //     {
  //       path: 'emi',
  //       loadChildren: () => import('./manage/Admin/emi/emi.module').then(m => m.EmiModule)
  //     }
  //   ]
  // }
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
