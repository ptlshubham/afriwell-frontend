import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from './category.service';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxPaginationModule } from 'ngx-pagination';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';

@NgModule({
  declarations: [CategoryComponent, BulkUploadComponent],
  imports: [
    CommonModule,
    FormsModule,
    JwBootstrapSwitchNg2Module,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule,
    ColorPickerModule,
    RouterModule.forChild([
      {
        path: '',
        component: CategoryComponent
      }
    ])
  ],
  providers: [
    CategoryService
  ],
  exports:[
    BulkUploadComponent
  ]

})
export class CategoryModule { }
