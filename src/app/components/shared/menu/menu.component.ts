import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/manage/Admin/category/category.model';
import { CoreService } from '../../user-service/core.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  public categoryList: Category[] = [];
  public subCategory: Category[] = [];
  subcate: Category[] = [];
  public subtosub: any = [];
  submenu:any=[];
  openSub: boolean = false;

  constructor(
    private coreService: CoreService,
    private router:Router
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
  getCategoryList() {
    this.coreService.getAllUserCate(0).subscribe((data: any) => {
      this.categoryList = data;
      this.categoryList.forEach(element => {
        this.coreService.getAllUserCate(element.id).subscribe((res: any) => {
          element.SubCategory = res;
        })
      })
    });
    this.categoryList;

  }
  openSubToSub(mainid, subid, i, j) {
    this.categoryList[i].SubCategory[j].subtosub = [];
    if (this.openSub == false) {
      this.openSub = true;
      this.coreService.getAllUserCate(subid).subscribe((data: any) => {
        if (data) {
          this.subtosub = data;
          this.categoryList[i].SubCategory[j].subtosub = data;
          this.categoryList[i].SubCategory[j].isopen = true;
          if (data.length == 0) {
            // this.getPoductToNavbar( this.categoryList[i].SubCategory[j].id);
          }
        }
        else {
          this.categoryList[i].SubCategory[j].isopen = false;
          // this.getPoductToNavbar( this.categoryList[i].SubCategory[j].id);
        }

      })
    }
    else {
      this.openSub = false;
      this.categoryList[i].SubCategory[j].isopen = false;
    }

  }
  OpenCategory(id,ind){
    this.submenu = this.categoryList[ind].SubCategory;
    debugger
  }
  openSubcat(id){
    this.router.navigate(['/home/products/'+id+'/left-sidebar']);
  }

}
