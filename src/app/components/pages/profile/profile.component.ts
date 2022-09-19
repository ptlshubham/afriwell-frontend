import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../shared/services/checkout.service';
import { ProductService } from '../../shared/services/product.service';
import { Address } from '../../user-models/address.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegister } from '../../user-models/userRegister.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  public userAddress: Address[] = [];
  isAddress: boolean = false;
  isUpdate: boolean = false;
  selectedAdd: any;
  public addressModel: Address = new Address;
  public userRegisterModel: UserRegister = new UserRegister;
  isOpenInfo: boolean = false;
  contentLoaded = false;

  constructor(
    public productService: ProductService,
    private checkoutService: CheckoutService,
    private snackBar: MatSnackBar
  ) {
    this.getUserData();
  }

  ngOnInit(): void {
    
    debugger
    setTimeout(() => {
      this.contentLoaded = true;
    }, 2000);
    this.getUserAddress();
  }
  openEditInfo() {
    this.isOpenInfo = true;
  }
  closeEditInfo() {
    this.isOpenInfo = false;

  }
  getUserAddress() {
    this.checkoutService.getAddress(localStorage.getItem('userId')).subscribe((data: any) => {
      this.userAddress = data;

    });
  }
  saveAddress() {

    this.addressModel.userid = localStorage.getItem('userId');

    // this.addressModel.state = this.selectedstate;
    this.checkoutService.saveUserAddress(this.addressModel).subscribe((response) => {
      this.getUserAddress();
      this.isAddress = false;
    })
  }
  addNewOpen() {
    this.isAddress = true;
    this.isUpdate = false;
  }
  addNewClose() {
    this.isAddress = false;
    this.isUpdate = false;

  }
  editAddress(data: any) {
    this.isAddress = true;
    this.addressModel = data;
    this.isUpdate = true;
  }
  updateSaveAddress() {
    this.addressModel.userid = localStorage.getItem('userId');
    this.checkoutService.updateAddress(this.addressModel).subscribe((req) => {
      this.getUserAddress();
      let message, status;
      message = 'The address has been updated Successfully.';
      status = 'success';
      this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
      this.isAddress = false;
      this.isUpdate = false;
    })
  }
  removeUserAddress(id: any) {

    this.checkoutService.removeAddress(id).subscribe((req) => {
      this.getUserAddress();
      let message, status;
      message = 'The address has been Deleted Successfully.';
      status = 'success';
      this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    })
  }
  getUserData() {
    this.checkoutService.getUserDetails().subscribe((res) => {
      this.userRegisterModel.fname = res[0].firstname;
      this.userRegisterModel.lname = res[0].lastname;
      this.userRegisterModel.email = res[0].email;
      this.userRegisterModel.contact = res[0].contactnumber;

    })
  }
  updateUserDetails() {
    this.userRegisterModel.id = localStorage.getItem('userId');
    debugger
    this.checkoutService.updateUserDetails(this.userRegisterModel).subscribe((res) => {
      this.userRegisterModel = res;
      let message, status;
      message = 'Personal Information has been Updated Successfully.';
      status = 'success';
      this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
      this.isOpenInfo = false;
      this.getUserData();
    })
  }
}
