import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/manage/Admin/category/category.model';
import { CoreService } from '../../user-service/core.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  public mainCategory: Category[] = [];
  public subCategory: Category[] = [];
  constructor(
    private coreService: CoreService
  ) {
    this.getCategoryList();
  }

  ngOnInit() {
  }
  openMegaMenu() {
    let pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el) {
      if (el.children.length > 0) {
        if (el.children[0].classList.contains('mega-menu')) {
          el.classList.add('mega-menu-pane');
        }
      }
    });
  }
  // async getMainCategory(id) {
  //   this.coreService.getAllUserCate(id).subscribe(data => {
  //     this.mainCategory = data;
  //     debugger
  //     this.mainCategory.forEach(element => {
  //       if (element.id) {
  //         this.getSubCategory(element.id);
  //         // this.selectedCat = element.name;
  //       }
  //     })
  //   });
  // }
  // getSubCategory(id) {
  //   this.coreService.getAllUserCate(id).subscribe(data => {
  //     this.subCategory = data;
  //     debugger
  //   });
  // }
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
