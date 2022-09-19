import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {
  isAdd: boolean = false;
  model!: NgbDateStruct;
  constructor() { }

  ngOnInit(): void {
  }
  addVendors() {
    
    this.isAdd = true;
  }
  saveVendor() {
    this.isAdd = false;
  }

}
