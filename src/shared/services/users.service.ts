import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {IUser} from "../interfaces/user.interface";
import {IAnimal} from "../interfaces/animal.interface";
import {IRole} from "../interfaces/role.interface";
import {INewUser} from "../interfaces/new-user.interface";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  public users$ = this.users.asObservable();

  private user: BehaviorSubject<IUser | undefined> = new BehaviorSubject<IUser | undefined>(undefined);
  public user$ = this.user.asObservable();

  private roles: BehaviorSubject<IRole[]> = new BehaviorSubject<IRole[]>([]);
  public roles$ = this.roles.asObservable();

  constructor(private http: HttpClient) { }

  fetchRoles(){
    this.http.get<IRole[]>(
      'https://localhost:7015/api/Auth/roles')
      .subscribe(roles => {
        this.roles.next(roles)
      });
  }

  fetchAllData() {
    this.http.get<IUser[]>(
      'https://localhost:7015/api/Auth')
      .subscribe(users => {
        this.users.next(users)
      });
  }

  fetchUniqueEmployee(id: string) {
    this.http.get<IUser>(`https://localhost:7015/api/Auth/${id}`)
      .subscribe(user => {
        this.user.next(user)
      });
  }

  putUser(user: IUser){
    this.http.put(`https://localhost:7015/api/Auth/${user.id}`, user).subscribe();
  }

  registerUser(user: INewUser){
    this.http.post(`https://localhost:7015/api/Auth/register`, user).subscribe();
  }

  resetUser(){
    this.user.next(undefined);
  }
}
