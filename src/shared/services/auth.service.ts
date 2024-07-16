import { Injectable } from '@angular/core';
import {LoginRequest} from "../interfaces/login-request.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {LoginResponse} from "../interfaces/login-response.interface";
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user.asObservable();

  constructor(private http: HttpClient) { }

  public login(request: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`https://localhost:7015/api/auth/login`, {
      email: request.email,
      password: request.password,
    });
  }

  public setUser(user: User) :void{
    this.user.next(user)
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

}
