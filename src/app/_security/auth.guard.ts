import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Principal } from "./Principal";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const principal: Principal | null = this.authService.principalValue;
        let activateRout: boolean = false;

        // If user is logged in
        if(principal) {
            if(route.data['roles'] && route.data['roles'].length > 0) {
                for(let role of route.data['roles']) {
                    if(principal.roles.indexOf(role) !== -1) {
                        return true;
                    }
                }
            }

            // User is logged in but does not have the requared roles.
            return false;
        }

        // User is not logged in
        this.router.navigate(['/login'], {queryParams: {requestedUrl: state.url}});
        return false;
    }

}