import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegister } from '../../user-models/userRegister.model';
import { UserRegisterService } from '../../user-service/register.service';

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
    private router: Router
  ) { }

  ngOnInit() {
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
      localStorage.setItem('userId', data[0].id);
      localStorage.setItem('userName', data[0].firstname + ' ' + data[0].lastname);
      this.reloadCurrentRoute();
    });
  }
  reloadCurrentRoute() {
    let currentUrl = 'home/landing';
    this.router.navigateByUrl('/main', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
