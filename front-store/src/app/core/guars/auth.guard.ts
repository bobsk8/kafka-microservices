import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService } from 'src/app/modules/frameless-page/login/login.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad {
    constructor(
        private loginService: LoginService,
        private router: Router,
    ) { }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this.isPermition(route.path);
    }

    private isPermition(path: string): boolean {
        const userAuth = this.loginService.getUserSessionToken();
        if (!userAuth) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }

}
