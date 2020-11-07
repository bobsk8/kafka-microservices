import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else if (error.error && error.error.message.includes('JWT expired')) {
                        errorMessage = 'Session expired, please log in again';
                        sessionStorage.clear();
                        this.router.navigate(['']);
                    } else {
                        errorMessage = error.error.message;
                    }
                    this.openErrorDialog(errorMessage);
                    return throwError(errorMessage);
                })
            );
    }

    openErrorDialog(message: any): void {
        alert(message);
    }

}
