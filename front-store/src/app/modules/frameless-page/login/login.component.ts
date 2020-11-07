import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(form: any): void {
    this.submitted = true;
    if (!form.valid) {
      return;
    }
    const loginDto = Object.assign(new LoginDto(), form.value);
    this.login(loginDto);
  }

  login(loginDto: LoginDto): void {
    this.loginService.login(loginDto)
    .subscribe(resp => {
      this.loginService.setCurrentUserSession(resp.user, resp.token);
      this.router.navigate(['project']);
    });
  }

}
