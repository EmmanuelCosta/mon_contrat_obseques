    import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import Common from '../utils/Common'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var c = new  Common();
        if (localStorage.getItem(c.getTokenName())) {
            // logged in so return true
            console.log("is true")
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/session/loginone'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}