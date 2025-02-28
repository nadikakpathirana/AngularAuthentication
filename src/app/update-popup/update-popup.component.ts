import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.css'],
})
export class UpdatePopupComponent implements OnInit {
  userData: any;
  roleList: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdatePopupComponent>
  ) {}

  ngOnInit(): void {
    this.authService.GetAllRoles().subscribe((res) => {
      this.roleList = res;
    });

    if (this.data.userCode !== null && this.data.userCode !== null) {
      this.authService.GetUserByCode(this.data.userCode).subscribe((res) => {
        this.userData = res;
        this.updateForm.setValue({
          id: this.userData.id,
          name: this.userData.name,
          password: this.userData.password,
          email: this.userData.email,
          gender: this.userData.gender,
          role: this.userData.role,
          isActive: this.userData.isActive,
        });
      });
    }
  }

  updateForm = this.formBuilder.group({
    id: this.formBuilder.control(''),
    name: this.formBuilder.control(''),
    password: this.formBuilder.control(''),
    email: this.formBuilder.control(''),
    gender: this.formBuilder.control('male'),
    role: this.formBuilder.control('', Validators.required),
    isActive: this.formBuilder.control(false),
  });

  handleUpdate() {
    if (this.updateForm.valid) {
      this.authService.UpdateUser(this.updateForm.value.id, this.updateForm.value).subscribe((res) => {
        this.toastrService.success(
          'Updated successfully.'
        );
        this.dialogRef.close();
      });
    } else {
      this.toastrService.warning('Please select a role.');
    }
  }
}
