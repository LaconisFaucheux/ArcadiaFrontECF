import {Injectable} from '@angular/core';
import {LoginRequest} from "../interfaces/login-request.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {LoginResponse} from "../interfaces/login-response.interface";
import {HttpClient} from "@angular/common/http";
import {IUser} from "../interfaces/user.interface";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<IUser | undefined> = new BehaviorSubject<IUser | undefined>(undefined);
  public user$ = this.user.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.user.next(this.getUser());
  }

  public getToken() :string{
    return this.cookieService.get('Authorization');
  }

  public login(request: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`https://localhost:7015/api/auth/login`, {
      email: request.email,
      password: request.password,
    });
  }

  public setUser(user: IUser) :void{
    this.user.next(user)
    sessionStorage.setItem('user-email', user.email);
    sessionStorage.setItem('user-roles', user.roles.join(','));
  }

  public getUser() : IUser | undefined {
    const email = sessionStorage.getItem('user-email');
    const roles = sessionStorage.getItem('user-roles');

    if (email && roles){
      return {
        id: undefined,
        email: email,
        roles: roles.split(',')
      };
    }
    return undefined;
  }

  public logout() :void {
    sessionStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.user.next(undefined);
  }

}
