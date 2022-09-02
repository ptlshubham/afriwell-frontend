import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { NgxPaginationModule } from 'ngx-pagination';




@NgModule({
  declarations: [InventoryComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule,
    JwBootstrapSwitchNg2Module,
    RouterModule.forChild([
      {
        path: '',
        component: InventoryComponent
      }
    ])
  ]
})
export class InventoryModule { }
