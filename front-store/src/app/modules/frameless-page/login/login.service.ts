import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { LoginDto } from './dto/login.dto';
import { User } from 'src/app/model/user.model';
import { LoginReturnDto } from './dto/login-return.dto';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = environment.apiEndPoint;
  constructor(
    private http: HttpClient
  ) { }

  login(loginDto: LoginDto): Observable<LoginReturnDto> {
    return this.http.post<LoginReturnDto>(`${this.url}/api/auth/login`, loginDto, httpOptions)
      .pipe(
        catchError(err => {
          console.log('login error: ', err);
          return throwError(err);
        })
      );
  }

  setCurrentUserSession(user: User, token: string): void {
    sessionStorage.setItem('currentUser', JSON.stringify({ user, token }));
  }

  getUserSessionToken(): string {
    return (sessionStorage.getItem('currentUser') !== null) ? JSON.parse(sessionStorage.getItem('currentUser')).token : undefined;
  }

  getUserSession(): User {
    return (sessionStorage.getItem('currentUser') !== null) ? JSON.parse(sessionStorage.getItem('currentUser')).user : undefined;
  }

}