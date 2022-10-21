import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiprocketRoutes } from './shiprocket.routing';
import { RouterModule } from '@angular/router';
import { ShipOrdersComponent } from './ship-orders/ship-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxPaginationModule } from 'ngx-pagination';
import { CourierPartnersComponent } from './courier-partners/courier-partners.component';



@NgModule({
  declarations: [
    ShipOrdersComponent,
    CourierPartnersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ShiprocketRoutes),
    FormsModule,
    JwBootstrapSwitchNg2Module,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule,
    ColorPickerModule,

  ]
})
export class ShiprocketModule { }
