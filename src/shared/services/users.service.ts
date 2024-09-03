import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {IUser} from "../interfaces/user.interface";
import {IAnimal} from "../interfaces/animal.interface";
import {IRole} from "../interfaces/role.interface";
import {INewUser} from "../interfaces/new-user.interface";
import {Router} from "@angular/router";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl: string = '';

  private users: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  public users$ = this.users.asObservable();

  private user: BehaviorSubject<IUser | undefined> = new BehaviorSubject<IUser | undefined>(undefined);
  public user$ = this.user.asObservable();

  private roles: BehaviorSubject<IRole[]> = new BehaviorSubject<IRole[]>([]);
  public roles$ = this.roles.asObservable();

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {
    this.apiUrl = this.apiService.getapiUrl();
  }

  //GET
  fetchRoles(){
    this.http.get<IRole[]>(
      `${this.apiUrl}/Auth/roles`)
      .subscribe(roles => {
        this.roles.next(roles)
      });
  }

  fetchAllData() {
    this.http.get<IUser[]>(
      `${this.apiUrl}/Auth`)
      .subscribe(users => {
        this.users.next(users)
      });
  }

  fetchUniqueEmployee(id: string) {
    this.http.get<IUser>(`${this.apiUrl}/Auth/${id}`)
      .subscribe(user => {
        this.user.next(user)
      });
  }

  //PUT
  putUser(user: IUser){
    this.http.put(`${this.apiUrl}/Auth/${user.id}`, user)
      .subscribe({
        next: (response) => {
          alert('Mise à jour réussie')
          this.router.navigateByUrl('/admin/employees')
        },
        error: (error) => {
          alert('Échec de la mise à jour')
        }
      });
  }

  //POST
  registerUser(user: INewUser){
    this.http.post(`${this.apiUrl}/Auth/register`, user)
      .subscribe({
        next: (response) => {
          alert('Employé créé avec succès!')
          this.router.navigateByUrl('admin/employees')
        },
        error: (error) => {
         alert('Échec de la création de l\'employé');
        }
    });
  }

  //DELETE
  deleteUser(id: string){
    this.http.delete(`${this.apiUrl}/Auth/${id}`, {responseType: "text"})
      .subscribe({
        next: (response) => {
          this.fetchAllData()
        },
        error: (error) => {}
      }
    );
  }

  resetUser(){
    this.user.next(undefined);
  }

  generatePassword(length: number = 14): string {
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

    const allChars = upperChars + lowerChars + digits + specialChars;

    let password = "";

    password += upperChars[Math.floor(Math.random() * upperChars.length)];
    password += lowerChars[Math.floor(Math.random() * lowerChars.length)];
    password += digits[Math.floor(Math.random() * digits.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    for (let i = 4; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    const pwd = password.split('').sort(() => 0.5 - Math.random()).join('');
    //this.RandomPassword.setValue(pwd)
    return pwd;
  }
}
