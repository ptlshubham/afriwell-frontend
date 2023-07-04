import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/components/user-service/core.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {
  @Input() subCat: number;
  categoryList:any=[];
  constructor(
    private coreService:CoreService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getCategoryList();
  }
  getCategoryList() {
    
    this.categoryList=[];
    this.coreService.getCatForCategoriesComponent(this.subCat).subscribe((data: any) => {
      this.categoryList = data;
      
       
      // this.categoryList.forEach(element => {
      //   this.coreService.getAllUserCate(element.id).subscribe((res: any) => {
      //     element.SubCategory = res;
      //   })
      // })
    });
    this.categoryList;
  }
  openProduct(id){
    this.router.navigate(['/home/products/'+id+'/left-sidebar']);
  }

}
