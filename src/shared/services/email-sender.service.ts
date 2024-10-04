import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {IEmail} from "../interfaces/email.interface";
import {AuthService} from "./auth.service";
import {IUser} from "../interfaces/user.interface";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {
  private apiUrl: string = '';
  private user: IUser | undefined;

  constructor(private http: HttpClient,
              private apiService: ApiService,
              private auth: AuthService,
              private router: Router) {
    this.apiUrl = this.apiService.getapiUrl();
    this.user = this.auth.getUser();
  }

  public sendMailAsAdmin(mail: IEmail) : void{
    if(!this.user?.roles?.includes("Admin")) return;
    console.log(this.user);

    console.log(`${this.apiUrl}/Email/mail-as-admin`);

    this.http.post<IEmail>(`${this.apiUrl}/Email/mail-as-admin`, mail)
      .subscribe({
        next: (response) => {
          alert('Email envoyé avec succès')//faire un toaster
        },
        error: (error) => {
          alert('Echec de l\'envoi du mail');
        }
      });
  }

  public sendMailAsEmployee(mail : IEmail) : void{
    if(!this.user?.roles?.includes("Employee")) return;

    this.http.post<IEmail>(`${this.apiUrl}/Email/mail-as-employee`, mail)
      .subscribe({
        next: (response) => {
          alert('Email envoyé avec succès')//faire un toaster
        },
        error: (error) => {
          alert('Echec de l\'envoi du mail');
        }
      });
  }

  public sendMailAsVisitor(mail: IEmail) : void{
    if(this.user) return;

    this.http.post<IEmail>(`${this.apiUrl}/Email/mail-as-admin`, mail)
      .subscribe({
        next: (response) => {
          alert('Email envoyé avec succès')//faire un toaster
        },
        error: (error) => {
          alert('Echec de l\'envoi du mail');
        }
      });
  }

}
