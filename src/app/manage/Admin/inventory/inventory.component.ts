import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Category } from '../category/category.model';
import { CategoryService } from '../category/category.service';
import { ClothSize } from '../category/clothsize.model';
import { Images } from '../category/images.model';
import { Product } from '../category/product.model';
import { InventoryService } from './inventory.service';
declare var require: any
declare var $: any;
declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: any[];
}
@Component({
  // moduleId: module.id,
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  public ProductModel: Product = new Product;
  public product: Product[] = [];
  public Chagesproduct: Product[] = [];
  public dataTable: DataTable;
  // public ClothSizeModel: ClothSize = new ClothSize;
  // public clothsize: ClothSize[] = [];

  selectClothSize: any;
  model: Date;
  restock: Product = {};
  imageProduct: Product = {};
  index: any;
  selectedCheck: boolean = false;
  popularProduct: boolean = true;
  isFileUploader: boolean = false;
  // addSelectFields: any = [];
  value = 0;
  selectedCat: any;
  selectedSubCat: any;
  selectedSubProCat: any;
  maincatid: any;
  subcatid: any;
  subtosubid: any;
  // isdef: boolean = true;
  // isntdef: boolean = false;
  selectedCategory: any;
  addnewarrival: boolean = false;
  addbestprdt: boolean = false;
  addhotprdt: boolean = false;
  addsale: boolean = false;
  mpage: Number = 1;
  totalRec: string;
  public category: Category[] = [];
  public subcategory: Category[] = [];
  public subprodcat: Category[] = [];
  subToSubCat: any;
  productCategory: any = [];
  productImagesList: any = [];

  addingprdtimg: any = [];
  val = 0;
  multiplefile: any = [];
  imageError: string;
  isImageSaved: boolean = true;
  cardImageBase64: string;
  multi: any = [];
  public ImagesModel: Images = new Images;

  constructor(

    private categoryService: CategoryService,
    private inventoryService: InventoryService,
    private router: Router,
    private apiservice: ApiService
  ) {
    this.productCategory = [
      {
        name: 'Hot Product'
      },
      {
        name: 'Sale Product',
      },
      {
        name: 'New Arrivals',
      },
      {
        name: 'Best Product'
      }

    ]
    this.getProductList();
    this.getMainCategory(0);
  }

  ngOnInit(): void {
    // this.addSelectFields = [{ name: this.value }];
    // this.value++;
    this.model = new Date();
    if ($(".selectpicker").length != 0) {
      $(".selectpicker").selectpicker({
        iconBase: "nc-icon",
        tickIcon: "nc-check-2"
      });
    }
  }
  selectProductCategory(name: any) {
    this.selectedCategory = name;
    if (name == 'Hot Product') {
      let data = {
        filter: 'hot'
      }
      this.inventoryService.getFilterProduct(data).subscribe((data: any) => {
        this.product = data;
        for (let i = 0; i < this.product.length; i++) {
          this.product[i].index = i + 1;
        }
        // this.product.forEach(element => {
        //   this.inventoryService.getSize(element.id).subscribe((data: any) => {
        //     element.sizeList = data;
        //   })
        // });

      })
    }
    else if (name == 'Best Product') {
      let data = {
        filter: 'best'
      }
      this.inventoryService.getFilterProduct(data).subscribe((data: any) => {
        this.product = data;
        for (let i = 0; i < this.product.length; i++) {
          this.product[i].index = i + 1;
        }
        // this.product.forEach(element => {
        //   this.inventoryService.getSize(element.id).subscribe((data: any) => {
        //     element.sizeList = data;
        //   })
        // });
      })
    }
    else if (name == 'Sale Product') {
      let data = {
        filter: 'sale'
      }
      this.inventoryService.getFilterProduct(data).subscribe((data: any) => {
        this.product = data;
        for (let i = 0; i < this.product.length; i++) {
          this.product[i].index = i + 1;
        }
        // this.product.forEach(element => {
        //   this.inventoryService.getSize(element.id).subscribe((data: any) => {
        //     element.sizeList = data;
        //   })
        // });
      })
    }
    else {
      let data = {
        filter: 'new'
      }
      this.inventoryService.getFilterProduct(data).subscribe((data: any) => {
        this.product = data;
        for (let i = 0; i < this.product.length; i++) {
          this.product[i].index = i + 1;
        }
        // this.product.forEach(element => {
        //   this.inventoryService.getSize(element.id).subscribe((data: any) => {
        //     element.sizeList = data;
        //   })
        // });
      })
    }
    // this.productCategory.forEach(element => {
    //   if (element.name == name) {
    //     this.selectedCategory = element.name;
    //   }
    // })
  }
  ngAfterViewInit() {
    $('#datatable').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      }
    });
    var table = $('#datatable').DataTable();
  }
  getMainCategory(id: any) {
    this.categoryService.getMainCat(id).subscribe(data => {
      this.category = data;
    });
  }
  editproduct() {
    this.router.navigate(['category'], {
      queryParams: {
        value: JSON.stringify(this.Chagesproduct)
      },
    });
  }
  cateMain(id: any) {
    this.maincatid = null;
    this.subcatid = null;
    this.subToSubCat = null;
    this.maincatid = id;
    let data = {
      maincatid: this.maincatid,
      catid: null,
      subid: null
    }
    this.categoryService.GetFilterProduct(data).subscribe(data => {
      this.product = data;

      // for (let i = 0; i < this.product.length; i++) {
      //   this.product[i].index = i + 1;
      // }
      // this.product.forEach(element => {
      //   this.inventoryService.getSize(element.id).subscribe((data: any) => {
      //     element.sizeList = data;
      //      
      //   })
      // });
    });
    this.category.forEach(element => {
      if (element.id == id) {
        this.selectedCat = element.name;

      }
    })
    this.getSubCategory(id);

  }
  getSubCategory(id: any) {
    this.subToSubCat = id;
    let data = {
      maincatid: this.maincatid,
      catid: this.subcatid,
      subid: this.subToSubCat
    }

    this.categoryService.GetFilterProduct(data).subscribe(data => {
      this.product = data;
      for (let i = 0; i < this.product.length; i++) {
        this.product[i].index = i + 1;
      }
      // this.product.forEach(element => {
      //   this.inventoryService.getSize(element.id).subscribe((data: any) => {
      //     element.sizeList = data;
      //   })
      // });
    });
    this.categoryService.getMainCat(id).subscribe(data => {
      this.subcategory = data;
    });
  }
  cateCategory(id: any) {
    this.subcatid = id;
    let data = {
      maincatid: this.maincatid,
      catid: this.subcatid,
      subid: null
    }
    this.categoryService.GetFilterProduct(data).subscribe(data => {
      this.product = data;
      for (let i = 0; i < this.product.length; i++) {
        this.product[i].index = i + 1;
      }
      // this.product.forEach(element => {
      //   this.inventoryService.getSize(element.id).subscribe((data: any) => {
      //     element.sizeList = data;
      //   })
      // });
    });
    this.subcategory.forEach(element => {
      if (element.id == id) {
        this.selectedSubCat = element.name;
      }
    })
    this.getProductSubCategory(id);
  }
  getProductSubCategory(id: any) {

    this.categoryService.getMainCat(id).subscribe(data => {
      this.subprodcat = data;
    });
  }
  subProCategory(id: any) {
    this.subToSubCat = id;
    this.subToSubCat = id;
    let data = {
      maincatid: this.maincatid,
      catid: this.subcatid,
      subid: this.subToSubCat
    }

    this.categoryService.GetFilterProduct(data).subscribe(data => {
      this.product = data;
      for (let i = 0; i < this.product.length; i++) {
        this.product[i].index = i + 1;
      }
      // this.product.forEach(element => {
      //   this.inventoryService.getSize(element.id).subscribe((data: any) => {
      //     element.sizeList = data;
      //   })
      // });
    });
    this.ProductModel.subCategory = id;
    this.subprodcat.forEach(element => {
      if (element.id == id) {
        this.selectedSubProCat = element.name;
      }
    })
  }
  // addSelectSize(i: any) {

  //   let data = {
  //     productid: this.restock.id,
  //     size: '',
  //     quantity: '0',
  //     soldquantity: 0
  //   }
  //   this.addSelectFields = [];
  //   if (this.isntdef == false) {
  //     this.isntdef = true;
  //     this.isdef = false;
  //     // this.restock.sizeList=data;
  //     this.addSelectFields = this.restock.sizeList;
  //     this.addSelectFields.push(data);
  //   }
  //   else {
  //     this.isntdef = false;
  //     this.isdef = true;
  //     this.addSelectFields = this.restock.sizeList;
  //     this.addSelectFields.push(data);
  //   }

  // }
  // removeSelectSize(value: any) {
  //   this.addSelectFields.splice(value, 1);
  // }
  getProductList() {
    this.product = [];
    this.inventoryService.getProduct().subscribe((data: any) => {
      this.product = data;
        

      for (let i = 0; i < this.product.length; i++) {
        this.product[i].index = i + 1;
      }

      // this.product.forEach(element => {
      //   this.inventoryService.getSize(element.id).subscribe((data: any) => {
      //     element.sizeList = data;
      //   })
      // })
      this.product.forEach(element => {
        element.selectedCheck = false;
      })
    });
  }
  removeProduct() {
    this.product.forEach(element => {
      if (element.selectedCheck == true) {
        debugger
        this.inventoryService.removeProduct(element.productId).subscribe((req) => {
          this.apiservice.showNotification('top', 'right', 'Product Removed Successfully.', 'success');
          this.getProductList();
        })
      }
    })

  }
  removeIndIvidualProduct(pro: any, ind: any) {

    this.inventoryService.removeProduct(pro.productId).subscribe((req) => {
      this.apiservice.showNotification('top', 'right', 'Product Removed Successfully.', 'success');
      this.getProductList();
    })

  }
  selectAll(event: any) {

    if (event == true) {
      this.selectedCheck = false;
      this.inventoryService.getProduct().subscribe((data: any) => {
        this.product = data;
        for (let i = 0; i < this.product.length; i++) {
          this.product[i].index = i + 1;
        }
        // this.product.forEach(element => {
        //   element.selectedCheck = false;
        //   this.inventoryService.getSize(element.id).subscribe((data: any) => {
        //     element.sizeList = data;
        //   })
        // })
        this.Chagesproduct = [];
      });
    }
    else {
      this.selectedCheck = true;
      this.inventoryService.getProduct().subscribe((data: any) => {
        this.product = data;
        for (let i = 0; i < this.product.length; i++) {
          this.product[i].index = i + 1;
        }
        // this.product.forEach(element => {
        //   element.selectedCheck = true;
        //   this.inventoryService.getSize(element.id).subscribe((data: any) => {
        //     element.sizeList = data;
        //   })
        // })
        this.Chagesproduct = this.product;
      });
    }

  }
  onChanges(sel: any, data: any, idx: any) {

    if (sel == false) {
      this.product[idx].selectedCheck = true;
      this.Chagesproduct.push(data);
    }
    else {
      this.product[idx].selectedCheck = false;
      for (let i = 0; i < this.Chagesproduct.length; i++) {
        if (this.Chagesproduct[i].id == data.id) {
          this.Chagesproduct.splice(i, 1);
        }
      }
    }


  }
  restokProduct(data: any, ind: any) {
    this.restock = data;
    this.restock.index = ind + 1;
    // this.getClothSize();
    // this.addSelectFields = this.restock.sizeList;

  }
  onDiscountChange(searchValue: string,): void {
    this.restock.discountPrice = +this.restock.productPrice - (+this.restock.productPrice * +this.restock.productPer / 100);

  }
  updateProductStock(data: any) {
    this.restock = data;
    this.inventoryService.restokProductQuantity(this.restock).subscribe(data => {
      this.apiservice.showNotification('top', 'right', 'Product Stock Updated Successfully.', 'success');
    })
  }

  // submitClothSize(id: any, index: any) {
  //   if (index != undefined) {

  //     this.clothsize.forEach(element => {
  //       if (element.id == id) {
  //         this.addSelectFields[index].size = element.size;
  //         // this.addSelectFields[index].soldquantity =0;
  //       }
  //     })
  //   }
  //   else {
  //     this.clothsize.forEach(element => {
  //       if (element.id == id) {
  //         this.selectClothSize = element.size;
  //       }
  //     })
  //   }
  // }
  // getClothSize() {
  //   this.categoryService.getCloth().subscribe((data: any) => {
  //     this.clothsize = data;

  //   });
  // }

  //filter code from here
  AddToNewArrival() {
    if (this.addnewarrival == false) {
      this.addnewarrival = true;
      this.addbestprdt = false;
      this.addsale = false;
      this.addhotprdt = false;
        
      this.inventoryService.addToNewArrivals(this.Chagesproduct).subscribe(data => {
        this.apiservice.showNotification('top', 'right', 'Product Added Into New Arrival Successfully.', 'success');
      })
    }
    else {
      this.addnewarrival = false;
    }


  }

  AddToBestProduct() {
    if (this.addbestprdt == false) {
      this.addnewarrival = false;
      this.addbestprdt = true;
      this.addsale = false;
      this.addhotprdt = false;
  
      // this.Chagesproduct.forEach(element => {
      //   element.isBestProduct = true;
      //   element.isNewArrival = false;
      //   element.isOnSale = false;
      //   element.isHot = false;
      // });
      this.inventoryService.addToBestProduct(this.Chagesproduct).subscribe(data => {
        this.apiservice.showNotification('top', 'right', 'Product Added Into Best Successfully.', 'success');
      })
    }
    else {
      this.addbestprdt = false;
    }

  }
  AddToHotProduct() {
    if (this.addhotprdt == false) {
      this.addnewarrival = false;
      this.addbestprdt = false;
      this.addsale = false;
      this.addhotprdt = true;
      this.inventoryService.addTohotProduct(this.Chagesproduct).subscribe(data => {
        this.apiservice.showNotification('top', 'right', 'Product Added Into Hot Successfully.', 'success');
      })
    }
    else {
      this.addhotprdt = false;
    }

  }
  AddToSale() {

    if (this.addsale == false) {
      this.addnewarrival = false;
      this.addbestprdt = false;
      this.addsale = true;
      this.addhotprdt = false;
      this.inventoryService.addToSale(this.Chagesproduct).subscribe(data => {
        this.apiservice.showNotification('top', 'right', 'Product Added Into Sale Successfully.', 'success');
      })
    }
    else {
      this.addsale = false;
    }

  }

  addImageUploader() {
    this.val++;
    this.addingprdtimg.push({ name: this.val });
  }
  removeImageUploader(val: any) {
    this.addingprdtimg.splice(val, 1);
  }
  getdetailImages(id: any) {
    this.categoryService.getProductDetailImages(id).subscribe(res => {
      this.addingprdtimg = res;

    })
  }
  onSelect(event: any) {
    let max_height;
    let max_width;

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      max_height = 1280;
      max_width = 900;

      if (event.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          console.log(img_height, img_width);
          if (img_height > max_height && img_width > max_width) {
            alert("image must be " + max_height + "*" + max_width);
            this.isImageSaved = false;
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          }
          else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            const formdata = new FormData();
            formdata.append('file', file);
            formdata.append('catid', this.ImagesModel.mainCategoryId);
            formdata.append('subcatid', this.ImagesModel.categoryId);
            formdata.append('grandchild', this.ImagesModel.subCategoryId);


            this.categoryService.selectMultiUploadImage(formdata).subscribe((response) => {

              this.multi.push(response);
            })
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  addProductImages(data) {
    this.isFileUploader = true;
    this.imageProduct = data;
  }
  saveBulkImages() {
    this.imageProduct.multi = this.multi;
    this.categoryService.saveBulkImages(this.imageProduct).subscribe(data => {
      this.apiservice.showNotification('top', 'right', 'Product Images Added Successfully.', 'success');
      this.isFileUploader = false;
    })
  }

  // getMainCategory() {
  //   this.categoryService.getMainCat().subscribe(data => {
  //     this.category = data;
  //   });
  // }

}
