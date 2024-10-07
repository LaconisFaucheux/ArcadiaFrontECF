import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {IUser} from "../interfaces/user.interface";
import {IAnimal} from "../interfaces/animal.interface";
import {IRole} from "../interfaces/role.interface";
import {INewUser} from "../interfaces/new-user.interface";
import {Router} from "@angular/router";
import {ApiService} from "./api.service";
import {EmailSenderService} from "./email-sender.service";
import {IEmail} from "../interfaces/email.interface";
import {ToastrService} from "ngx-toastr";
import {ToastNotifService} from "./toast-notif.service";

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

  constructor(private http: HttpClient,
              private router: Router,
              private apiService: ApiService,
              private emailSender: EmailSenderService,
              private toast: ToastNotifService
              ) {
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
          this.toast.showToast('Mise à jour réussie', true)
          this.router.navigateByUrl('/admin/employees')
        },
        error: (error) => {
          this.toast.showToast('Échec de la mise à jour', false)
        }
      });
  }

  //POST
  registerUser(user: INewUser){
    this.http.post(`${this.apiUrl}/Auth/register`, user)
      .subscribe({
        next: (response) => {
          //alert('Employé créé avec succès!')
          this.toast.showToast('Employé créé avec succès!', true);

          let message: string = `<h4 style="text-align: center">Bienvenue dans l'équipe Arcadia ${user.email.split('@')[0]}!</h4>
                                <br><p style="text-align: center">Votre identifiant de connexion est:</p>
                                <br><p style="text-align: center; font-weight: bold; font-size: large">${user.email}</p>
                                <br><p style="text-align: center">Rapprochez vous de votre administrateur pour obtenir votre mot de passe.</p>
                                <br><p style="text-align: center"><span style="font-weight: bolder;">RAPPEL</span>: il est fortement recommandé de changer ce mot de passe à la première
                                connexion. Ne le partagez jamais. En cas de perte contactez votre administrateur.</p>
                                <br><p style="text-align: center">Cordialement</p><br>
                                <p style="text-align: center">L'équipe Arcadia</p>`
          let mail: IEmail = {
            body: message,
            to: user.email,
            subject: "Bienvenue dans l'équipe Arcadia!",
          }
          console.log(mail);
          this.emailSender.sendMailAsAdmin(mail);

          this.router.navigateByUrl('admin/employees')
        },
        error: (error) => {
         this.toast.showToast('Échec de la création de l\'employé', false);
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
