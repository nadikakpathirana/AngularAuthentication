import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePopupComponent } from '../update-popup/update-popup.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  userList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthService, private dialog: MatDialog) {
    this.LoadUsers();
  }

  displayedColumns = ['username', 'name', 'email', 'role', 'status', 'action'];

  LoadUsers() {
    this.authService.GetAllUsers().subscribe((res) => {
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  UpdateUser(code: any) {
    const popup = this.dialog.open(UpdatePopupComponent, {
      enterAnimationDuration: "300ms",
      exitAnimationDuration: "300ms",
      width: "50%",
      data: {
        userCode: code
      }
    });

    popup.afterClosed().subscribe(res => {
      this.LoadUsers();
    })
  }
}
