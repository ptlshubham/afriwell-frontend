import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';
import { Product } from '../product.model';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
type AOA = any[][];

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.sass']
})
export class BulkUploadComponent implements OnInit {
  storeData: any;
  csvData: any;
  jsonData: any;
  textData: any;
  htmlData: any;
  fileUploaded: File;
  worksheet: any;

  selectedCat: any;
  selectedSubCatid: any;
  selectedSubCat: any;
  selectedSubProCat: any;
  subToSubCat: any;
  selectedMain: any;
  subCate: any;

  public category: Category[] = [];
  public subcategory: Category[] = [];
  public subprodcat: Category[] = [];
  public productMaster: Product[] = [];
  public ProductModel: Product[] = [];


  data: AOA = [[1, 2], [3, 4]];
  uploadedData: any = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  maintag: number;

  constructor(
    private categoryService: CategoryService,
    private apiservice: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMainCategory(0).then();
    this.getProductMasterTag();
  }
  async getMainCategory(id: any) {

    this.categoryService.getMainCat(id).subscribe(data => {
      this.category = data;
      for (let i = 0; i < this.category.length; i++) {
        this.category[i].index = i + 1;
      }
    });
  }
  cateMain(id) {
    this.selectedMain = id;
    this.category.forEach(element => {
      if (element.id == id) {
        this.selectedCat = element.name;
      }
    })
    this.getSubCategory(id);

  }
  cateCategory(id) {
    this.selectedSubCatid = id;
    this.subcategory.forEach(element => {
      if (element.id == id) {
        this.selectedSubCat = element.name;
      }
    })
    this.getProductSubCategory(id);
  }
  subProCategory(id) {
    this.subCate = id;
    this.subprodcat.forEach(element => {
      if (element.id == id) {
        this.selectedSubProCat = element.name;
      }
    })
  }
  getProductSubCategory(id) {

    this.categoryService.getMainCat(id).subscribe(data => {
      this.subprodcat = data;
      for (let i = 0; i < this.subprodcat.length; i++) {
        this.subprodcat[i].index = i + 1;
      }
    });
  }
  getSubCategory(id: any) {

    this.subToSubCat = id;
    this.categoryService.getMainCat(id).subscribe(data => {
      this.subcategory = data;
      for (let i = 0; i < this.subcategory.length; i++) {
        this.subcategory[i].index = i + 1;
      }

    });
  }


  uploadedFile(event) {
    this.fileUploaded = event.target.files[0];

    this.readExcel();
  }
  readExcel() {
    let readFile = new FileReader();
    readFile.onload = (e) => {
      this.storeData = readFile.result;

      var data = new Uint8Array(this.storeData);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      this.worksheet = workbook.Sheets[first_sheet_name];
    }
    readFile.readAsArrayBuffer(this.fileUploaded);

  }
  readAsCSV() {
    this.csvData = XLSX.utils.sheet_to_csv(this.worksheet);
    const data: Blob = new Blob([this.csvData], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(data, "CSVFile" + new Date().getTime() + '.csv');
  }
  readAsJson() {
    this.jsonData = XLSX.utils.sheet_to_json(this.worksheet, { raw: false });
    this.jsonData = JSON.stringify(this.jsonData);
    const data: Blob = new Blob([this.jsonData], { type: "application/json" });
    FileSaver.saveAs(data, "JsonFile" + new Date().getTime() + '.json');
  }
  readAsHTML() {
    this.htmlData = XLSX.utils.sheet_to_html(this.worksheet);
    const data: Blob = new Blob([this.htmlData], { type: "text/html;charset=utf-8;" });
    FileSaver.saveAs(data, "HtmlFile" + new Date().getTime() + '.html');
  }
  readAsText() {
    this.textData = XLSX.utils.sheet_to_txt(this.worksheet);
    const data: Blob = new Blob([this.textData], { type: 'text/plain;charset=utf-8;' });
    FileSaver.saveAs(data, "TextFile" + new Date().getTime() + '.txt');
  }
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log("data:", this.data);
      this.uploadedData = this.data;
      this.saveUploadedData();
      this.data.map(res => {
        if (res[0] === "no") {
          console.log(res[0]);
        } else {
          console.log(res[0]);
        }
      })
    };
    reader.readAsBinaryString(target.files[0]);
  }
  getProductMasterTag() {
    this.categoryService.getProductMasterTag().subscribe(res => {
      if(res.length ==0){
        this.maintag=1;
      }else{
        this.productMaster = res;
        this.maintag = this.productMaster[0].maintag + 1;
      }

     
    })
  }
  saveUploadedData() {
    this.uploadedData;
    for (let i = 1; i < this.uploadedData.length; i++) {
      this.getProductMasterTag();
      // this.ProductModel.id = this.uploadedData[i][0];
      let data = {
        maintag: this.maintag,
        mainCategory: this.selectedMain,
        category: this.selectedSubCatid,
        subCategory: this.subCate,
        productName: this.uploadedData[i][1],
        brandName: this.uploadedData[i][2],
        manufacturerName: this.uploadedData[i][3],
        productCode: this.uploadedData[i][4],
        productSRNumber: this.uploadedData[i][5],
        productPrice: this.uploadedData[i][6],
        productPer: this.uploadedData[i][7],
        discountPrice: this.uploadedData[i][8],
        quantity: this.uploadedData[i][9],
        soldQuantity: 0,
        size: this.uploadedData[i][10],
        color: this.uploadedData[i][11],
        descripition: this.uploadedData[i][12],
        productDimension: this.uploadedData[i][13],
        itemWeight: this.uploadedData[i][14],
        taxslab: this.uploadedData[i][15],
        emiOptions: false,
        avibilityStatus: false,
        relatedProduct: false,
        isNewArrival: false,
        isBestProduct: false,
        isHot: false,
        isOnSale: false,
        startRating: false,
      }
      this.ProductModel.push(data);
    }
  }
  saveBulkUploadedData() {
    this.categoryService.saveBulkProduct(this.ProductModel).subscribe((response) => {
      this.apiservice.showNotification('top', 'right', 'Product successfully added.', 'success');
    })
  }
   export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
