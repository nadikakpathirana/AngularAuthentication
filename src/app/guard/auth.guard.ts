import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (authService.IsLoggedIn()) {
    if (route.url.length > 0) {
      let menu = route.url[0].path;
      if (menu == 'users') {
        if (authService.GetUserRole() == 'admin') {
          return true;
        } else {
          router.navigate(['']);
            toastr.warning('You dont have access.')
          return false;
        }
      }else{
        return true;
      }
    } else {
      return true;
    }
  }
  else {
    router.navigate(['login']);
    return false;
  }
};
