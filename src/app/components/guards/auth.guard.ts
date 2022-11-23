import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
       
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            debugger
            const currentUser = localStorage.getItem('userName');
            if (currentUser) {
                // logged in so return true
                return true;
            }else{
                this.router.navigate(['/pages/my-account'], { queryParams: { returnUrl: state.url } });
                return false;
            }
        
        // not logged in so redirect to login page with the return url
       
    }
}
