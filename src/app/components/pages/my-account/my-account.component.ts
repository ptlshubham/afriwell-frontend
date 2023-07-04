import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegister } from '../../user-models/userRegister.model';
import { UserRegisterService } from '../../user-service/register.service';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.sass']
})
export class MyAccountComponent implements OnInit {
  isLogin: boolean = false;
  hide = true;
  public userRegisterModel: UserRegister = new UserRegister;
  public registerdUsers: UserRegister[] = [];

  constructor(
    private userRegisterService: UserRegisterService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cartService:CartService
  ) { }

  ngOnInit() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
  joinus() {
    this.isLogin = true;
  }
  loginWith() {
    this.isLogin = false;
  }
  saveUserDetails() {

    this.userRegisterModel.isactive = true;
    this.userRegisterService.saveUserRegister(this.userRegisterModel).subscribe((response) => {
      this.isLogin = false;
    })
  }
  login() {
     
    this.userRegisterService.login(this.userRegisterModel).subscribe(data => {
       
      let message, status;
      if (data.length > 0) {
        message = 'Welcome back ' + data[0].firstname + ' ' + data[0].lastname + '!';
        status = 'success';
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
        localStorage.setItem('Email', data[0].email);
        localStorage.setItem('userId', data[0].id);
        localStorage.setItem('userName', data[0].firstname + ' ' + data[0].lastname);
        localStorage.setItem('contactNo',data[0].contactnumber);
        localStorage.setItem('token',data[0].token);
        let data1 = JSON.parse(localStorage.getItem('cartItem'));
        if(data1 != null){
          this.cartService.addToCart(data1,1);
        }
         
      
        this.reloadCurrentRoute();
      }
      else {
        message = 'Enter Valid User Email and password';
        status = 'danger';
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
      }
     
    });
  }
  reloadCurrentRoute() {
    let currentUrl = 'home/landing';
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
