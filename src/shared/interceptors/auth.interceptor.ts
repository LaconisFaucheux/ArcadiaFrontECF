import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).getToken();
  const reqWithAuthHeader = req.clone({
    headers: req.headers.set('Authorization', authToken)
  });
  return next(reqWithAuthHeader);
};
