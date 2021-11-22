import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageRoutingModule } from './manage-routing.module';
import { AdminLayoutComponent } from './Admin/layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './Admin/layouts/auth/auth-layout.component';
import { FrontComponent } from './Admin/layouts/front/front.component';
import { FixedPluginModule } from './Admin/shared/fixedplugin/fixedplugin.module';
import { FooterModule } from './Admin/shared/footer/footer.module';
import { NavbarModule } from './Admin/shared/navbar/navbar.module';
import { SidebarModule } from './Admin/sidebar/sidebar.module';
import { PagesModule } from './Admin/pages/pages.module';
import { EmiModule } from './Admin/emi/emi.module';



@NgModule({
  declarations: [
    FrontComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    ManageRoutingModule,
    SidebarModule,
    NavbarModule,
    FooterModule,

    FixedPluginModule,
    // ColorPickerModule,

  ]
})
export class ManageModule { }
