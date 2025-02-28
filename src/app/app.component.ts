import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  title = 'AngularAuthentication';
  isMenuVisible = false;
  isAdmin = false;

  constructor(private router: Router) { }

  ngDoCheck(): void {
    let currentroute = this.router.url;
    if (currentroute == '/login' || currentroute == '/register') {
      this.isMenuVisible = false;
    } else {
      this.isMenuVisible = true;
    }

    let role = sessionStorage.getItem('role');
    if (role == 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}
