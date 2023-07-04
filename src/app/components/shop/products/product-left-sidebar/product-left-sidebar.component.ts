import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms'
import { ColorFilter, Productlist } from 'src/app/components/modals/productlist.model';
import { CategoryService } from 'src/app/manage/Admin/category/category.service';

@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.sass']
})
export class ProductLeftSidebarComponent implements OnInit {
  public sidenavOpen: boolean = true;
  public animation: any;   // Animation
  public sortByOrder: string = '';   // sorting
  public page: any;
  public tagsFilters: any[] = [];
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public filterForm: FormGroup;
  public colorFilters: ColorFilter[] = [];

  public items: Productlist[] = [];
  public allItems: any=[];
  public products: any=[] ;
  public tags: any[] = [];
  public colors: any[] = [];
  public category:any;

  constructor(private productService: ProductService, private route: ActivatedRoute,private categoryService:CategoryService) {
    this.route.params.subscribe(
      (params: any) => {
        this.category = params['category'];
        this.allItems=[];
        if(this.category == 'all'){
          let data = {
            maincatid:null,
            catid: this.category,
            subid: null
          }
          this.productService.getProductList().subscribe(products => {
            this.allItems = products;
            this.products = products.slice(0.8);
          })
        }else{
          let data = {
            maincatid:null,
            catid: this.category,
            subid: null
          }
          this.productService.getProductByCategory(data).subscribe(products => {
            this.allItems = products;
            this.products = products.slice(0.8);
          })
        }
      }
    )
    // this.getProducts();
  }



  // Get current product tags
  public getTags(products) {
    var uniqueBrands = []
    var itemBrand = Array();
    products.map((product, index) => {
      if (product.tags) {
        product.tags.map((tag) => {
          const index = uniqueBrands.indexOf(tag);
          if (index === -1) uniqueBrands.push(tag);
        })
      }
    });
    for (var i = 0; i < uniqueBrands.length; i++) {
      itemBrand.push({ brand: uniqueBrands[i] })
    }
    this.tags = itemBrand
  }

  // Get current product colors
  public getColors(products) {
    var uniqueColors = []
    var itemColor = Array();
    products.map((product, index) => {
      if (product.colors) {
        product.colors.map((color) => {
          const index = uniqueColors.indexOf(color);
          if (index === -1) uniqueColors.push(color);
        })
      }
    });
    for (var i = 0; i < uniqueColors.length; i++) {
      itemColor.push({ color: uniqueColors[i] })
    }
    this.colors = itemColor
  }

  ngOnInit() {}
  getProducts() {
    this.productService.getProductList().subscribe((data: any) => {
      this.allItems = data;
      this.products = data.slice(0.8);
      // this.getTags(data);
      // this.getColors(data);
    });
  }
  public changeViewType(viewType, viewCol) {
    this.viewType = viewType;
    this.viewCol = viewCol;
  }
  // Animation Effect fadeIn
  public fadeIn() {
    this.animation = 'fadeIn';
  }

  // Animation Effect fadeOut
  public fadeOut() {
    this.animation = 'fadeOut';
  }

  // Update tags filter
  public updateTagFilters(tags: any[]) {
    this.tagsFilters = tags;
    this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }
  // sorting type ASC / DESC / A-Z / Z-A etc.
  public onChangeSorting(val) {
    let sortArray:any=[];
    sortArray = this.allItems;
    this.animation = 'fadeIn';
    this.sortByOrder = val;
    if(val=='low'){
      // this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
      for(let i=0;i<this.allItems.length;i++){
        for(let j=i+1;j<this.allItems.length;j++){
          let temp:any={};
          if(this.allItems[i].productPrice>this.allItems[j].productPrice){
            let temp = this.allItems[i];
            this.allItems[i] = this.allItems[j];
            this.allItems[j] = temp;
          }
        }
      }
    }
    else if(val=="high"){
      this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
      for(let i=0;i<this.allItems.length;i++){
        for(let j=i+1;j<this.allItems.length;j++){
          let temp:any={};
          if(this.allItems[i].productPrice<this.allItems[j].productPrice){
            let temp = this.allItems[i];
            this.allItems[i] = this.allItems[j];
            this.allItems[j] = temp;
          }
        }
      }
    }
    else if(val =='a-z'){
      this.allItems.sort(function (a, b) {
        return  a.productName < b.productName ? -1 : 1 //using String.prototype.localCompare()
      });
    }
    else{
      this.allItems.sort(function (a, b) {
        return  a.productName > b.productName ? -1 : 1 //using String.prototype.localCompare()
      });
    }
    this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }

  // Initialize filetr Items
  public filterItems(): Productlist[] {
    return this.items.filter((item: Productlist) => {
      const Colors: boolean = this.colorFilters.reduce((prev, curr) => { // Match Color
        if (item.colors) {
          if (item.colors.includes(curr.color)) {
            return prev && true;
          }
        }
      }, true);
      const Tags: boolean = this.tagsFilters.reduce((prev, curr) => { // Match Tags
        if (item.tags) {
          if (item.tags.includes(curr)) {
            return prev && true;
          }
        }
      }, true);
      return Colors && Tags; // return true
    });

  }

  public onPageChanged(event) {
    this.page = event;
    this.allItems;
    window.scrollTo(0, 0);
  }
  // Update price filter
  public updatePriceFilters(price: any) {
    console.log(price);
    console.log(this.products);
    this.allItems = this.products.filter((item: Productlist) => {
      return item.productPrice >= price.priceFrom && item.productPrice <= price.priceTo
    });
  }

  onBrendsChanged(newBrend) {
    console.log(newBrend);
    this.allItems = newBrend === 'all' ? this.products : this.products.filter(

      item => item.brandName === newBrend
    )
    console.log(this.allItems);


  }
}
