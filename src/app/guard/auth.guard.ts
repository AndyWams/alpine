import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../accounts/authentication-service.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    canActivate() {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            return true;
        }
        this.router.navigate(['/accounts/login']);
        return false;
    }

}
