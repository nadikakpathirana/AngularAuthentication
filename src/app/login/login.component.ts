import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }

  userData: any;

  loginForm = this.formBuilder.group({
    username: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control('', Validators.required),
  });

  handleLogin() {
    if (this.loginForm.valid) {
      this.authService
        .GetUserByCode(this.loginForm.value.username)
        .subscribe((res) => {
          this.userData = res;
          console.log(this.userData);

          if (this.userData.password === this.loginForm.value.password) {
            if (this.userData.isActive) {
              sessionStorage.setItem('username', this.userData.id);
              sessionStorage.setItem('role', this.userData.role);
              this.router.navigate([""])
            } else {
              this.toastrService.error('Please contact admin', 'Inactive User');
            }
          } else {
            this.toastrService.error('Invalid creadencials');
          }
        });
    } else {
      this.toastrService.warning(
        'Both Username and Password fields are required'
      );
    }
  }
}
