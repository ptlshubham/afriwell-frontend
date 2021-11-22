import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmiService } from './emi.service';
import { EmiComponent } from './emi.component';



@NgModule({
  declarations: [EmiComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmiComponent
      }
    ])
  ],
  providers: [
    EmiService
  ],
})
export class EmiModule { }
