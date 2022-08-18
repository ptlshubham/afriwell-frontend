import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/components/user-service/core.service';
import { Category } from 'src/app/manage/Admin/category/category.model';

@Component({
  selector: 'app-categories-furniture',
  templateUrl: './categories-furniture.component.html',
  styleUrls: ['./categories-furniture.component.sass']
})
export class CategoriesFurnitureComponent implements OnInit {
  public mainCategory: Category[] = [];
  public subCategory: Category[] = [];
  constructor(
    private coreService: CoreService
  ) {
    this.getCategoryList();
  }

  ngOnInit(): void {
  }
  getCategoryList() {
    this.coreService.getAllUserCate(0).subscribe((data: any) => {
      this.mainCategory = data;
      this.mainCategory.forEach(element => {
        this.coreService.getAllUserCate(element.id).subscribe((res: any) => {
          element.SubCategory = res;
        })
      })
    });
    this.mainCategory;
  }
  openSubToSub(mainid, subid, i, j) {
    this.mainCategory[i].SubCategory[j].subtosub = [];
    this.coreService.getAllUserCate(subid).subscribe((data: any) => {
 
    })
    // else {
    //   this.mainCategory[i].SubCategory[j].isopen = false;
    // }

  }
}
