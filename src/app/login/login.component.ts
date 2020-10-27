import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  signInDetails: {};
  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.loginForm.value.email, this.loginForm.value.password);

    this.signInDetails = {
      emailId: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.userLogin(this.signInDetails).subscribe(
      (token: any) => {
        if (token) {
          localStorage.setItem('login', token.token);
          this.router.navigate(['/home']);
        }
      },
      (err) => {
        alert('Check Email and password');
      }
    );
  }

  goToRegister() {
    this.router.navigate(['register']);
  }
}
