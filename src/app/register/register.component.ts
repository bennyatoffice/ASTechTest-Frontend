import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerDeatils: {};

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthServiceService
  ) {
    this.registerForm = this.fb.group(
      {
        userName: ['', Validators.required],
        loginName: ['', Validators.required],
        emailId: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern('^((?=.*d)(?=.*[A-Z]).{8,})$'),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.MustMatch,
      }
    );
  }

  onSubmit() {
    console.log(this.registerForm.value.userName);
    console.log(this.registerForm.value.loginName);
    console.log(this.registerForm.value.emailId);
    console.log(this.registerForm.value.password);
    console.log(this.registerForm.value.confirmPassword);
    this.registerDeatils = {
      userName: this.registerForm.value.userName,
      loginName: this.registerForm.value.loginName,
      emailId: this.registerForm.value.emailId,
      password: this.registerForm.value.password,
    };

    this.authService.newUser(this.registerDeatils).subscribe(
      (data: any) => {
        console.log(data.token);

        localStorage.setItem('login', data.token);
        this.router.navigate(['/home']);
      },
      (err) => {
        alert('Email ID already exist');
      }
    );
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  MustMatch(group: FormGroup) {
    const password = group.value.password;
    const confirmPassword = group.value.confirmPassword;

    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
}
