import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const employeeOrVetGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUser = authService.getUser()
  const requiredRoles = ["Employee", "Vet"];

  if(!currentUser){
    router.navigateByUrl('/auth');
    return false;
  }

  const match = currentUser.roles.some(role => requiredRoles.includes(role));

  if(match){
    return true;
  } else {
    alert('Vous n\'avez pas l\'autorisation.');
    router.navigateByUrl('/admin');
    return false;
  }
};
