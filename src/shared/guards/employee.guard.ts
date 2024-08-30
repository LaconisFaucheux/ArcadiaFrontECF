import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const employeeGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUser = authService.getUser()
  const requiredRoles = "Employee";

  if(!currentUser){
    router.navigateByUrl('/auth');
    return false;
  }

  if(currentUser.roles.includes(requiredRoles)){
    return true;
  } else {
    alert('Vous n\'avez pas l\'autorisation.');
    router.navigateByUrl('/admin');
    return false;
  }
};
