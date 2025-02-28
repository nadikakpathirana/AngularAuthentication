import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  registerForm = this.formBuilder.group({
    id: this.formBuilder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    name: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ])
    ),
    email: this.formBuilder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    gender: this.formBuilder.control('male'),
    role: this.formBuilder.control(''),
    isActive: this.formBuilder.control(false),
  });

  handleRegistration() {
    if (this.registerForm.valid) {
      this.authService
        .RegisterUser(this.registerForm.value)
        .subscribe((res) => {
          this.toastrService.success("Please contect admin for enable accesss.", "Registerd successfully.")
          this.router.navigate(['login'])
        });
    } else {
      this.toastrService.warning("Please enter valid data.");
    }
  }
}
