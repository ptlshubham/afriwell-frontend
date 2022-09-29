import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/components/user-service/core.service';
import { Category } from 'src/app/manage/Admin/category/category.model';

@Component({
  selector: 'app-categories-furniture',
  templateUrl: './categories-furniture.component.html',
  styleUrls: ['./categories-furniture.component.sass']
})
export class CategoriesFurnitureComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  public categoryList: Category[] = [];
  public subCategory: Category[] = [];
  constructor(
    private coreService: CoreService,
    private router:Router
  ) {
    this.getCategoryList();
  }

  ngOnInit(): void {
  }
  getCategoryList() {
    
    this.coreService.getAllUserCate(0).subscribe((data: any) => {
      this.categoryList = data;
      
      this.categoryList.forEach(element => {
        this.coreService.getAllUserCate(element.id).subscribe((res: any) => {
          element.SubCategory = res;
          
        })
      })
    });
  

  }
  openSubToSub(mainid, subid, i, j) {
    
    this.router.navigate(['/home/products/'+this.categoryList[i].SubCategory[j].id+'/left-sidebar']);
    //   this.categoryList[i].SubCategory[j].subtosub = [];
    //   if (this.openSub == false) {
    //     this.openSub = true;
    //     this.coreService.getAllUserCate(subid).subscribe((data: any) => {
    //       if (data) {
    //         this.subtosub = data;
    //         this.categoryList[i].SubCategory[j].subtosub = data;
    //         this.categoryList[i].SubCategory[j].isopen = true;
    //         if (data.length == 0) {
    //           // this.getPoductToNavbar( this.categoryList[i].SubCategory[j].id);
    //         }
    //       }
    //       else {
    //         this.categoryList[i].SubCategory[j].isopen = false;
    //         // this.getPoductToNavbar( this.categoryList[i].SubCategory[j].id);
    //       }

    //     })
    //   }
    //   else {
    //     this.openSub = false;
    //     this.categoryList[i].SubCategory[j].isopen = false;
    //   }

  }

}
