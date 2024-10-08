import {Injectable} from '@angular/core';
import {LoginRequest} from "../interfaces/login-request.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {LoginResponse} from "../interfaces/login-response.interface";
import {HttpClient} from "@angular/common/http";
import {IUser} from "../interfaces/user.interface";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {ApiService} from "./api.service";
import {ToastNotifService} from "./toast-notif.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = '';

  private user: BehaviorSubject<IUser | undefined> = new BehaviorSubject<IUser | undefined>(undefined);
  public user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private apiService: ApiService,
    private toast: ToastNotifService) {

    this.apiUrl = this.apiService.getapiUrl();
    this.user.next(this.getUser());
  }

  public getToken(): string {
    return this.cookieService.get('Authorization');
  }

  public login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, {
      email: request.email,
      password: request.password,
    });
  }

  public setUser(user: IUser): void {
    this.user.next(user)
    if (user.id) {
      sessionStorage.setItem('user-id', user.id);
    }
    sessionStorage.setItem('user-email', user.email);
    sessionStorage.setItem('user-roles', user.roles.join(','));
  }

  public getUser(): IUser | undefined {
    const userId = sessionStorage.getItem('user-id');
    const email = sessionStorage.getItem('user-email');
    const roles = sessionStorage.getItem('user-roles');

    if (email && roles && userId) {
      return {
        id: userId,
        email: email,
        roles: roles.split(',')
      };
    }
    return undefined;
  }

  public updatePassword(id: string, pwdUpdate: FormData): void {
    this.http.put(
      `${this.apiUrl}/Auth/password/${id}`
      , pwdUpdate
      , {responseType: "text"})
      .subscribe(({
        next: (response) => {
          this.router.navigateByUrl('auth');
          this.logout()
          this.toast.showToast("Mot de passe mis à jour avec succès. Merci de vous reconnecter.", true)
        },
        error: (error) => {
          this.toast.showToast("Echec de la mise à jour du mot de passe", false)
        }
      }));
  }

  public resetPassword(id: string, fd: FormData): void {
    this.http.put(
      `${this.apiUrl}/Auth/forgotten-password/${id}`
      , fd
      , {responseType: "text"})
      .subscribe(({
        next: (response) => {
          this.router.navigateByUrl('/admin/employees');
          this.toast.showToast("Mot de passe mis à jour avec succès.", true)
        },
        error: (error) => {
          this.toast.showToast("Echec de la mise à jour du mot de passe", false)
        }
      }));
  }

  public logout(): void {
    sessionStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.user.next(undefined);
  }
}
