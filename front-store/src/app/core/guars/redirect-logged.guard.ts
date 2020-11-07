import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService } from 'src/app/modules/frameless-page/login/login.service';

@Injectable({
    providedIn: 'root'
})
export class RedirectLoggedGuard implements CanLoad {
    constructor(
        private loginService: LoginService,
        private router: Router,
    ) { }
    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        const token = this.loginService.getUserSessionToken();

        if (token) {
            this.router.navigate(['product']);
            return false;
        } else {
            return true;
        }
    }
}
