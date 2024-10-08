import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {IEmail} from "../interfaces/email.interface";
import {AuthService} from "./auth.service";
import {IUser} from "../interfaces/user.interface";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ToastNotifService} from "./toast-notif.service";

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {
  private apiUrl: string = '';
  private user: IUser | undefined;

  constructor(private http: HttpClient,
              private apiService: ApiService,
              private auth: AuthService,
              private router: Router,
              private toast: ToastNotifService,) {
    this.apiUrl = this.apiService.getapiUrl();
    this.user = this.auth.getUser();
  }

  public sendMailAsAdmin(mail: IEmail) : void{
    if(!this.user?.roles?.includes("Admin")) return;

    this.http.post<IEmail>(`${this.apiUrl}/Email/mail-as-admin`, mail)
      .subscribe({
        next: (response) => {
          this.toast.showToast('Email envoyé avec succès', true)
          this.router.navigateByUrl('/')
        },
        error: (error) => {
          this.toast.showToast('Echec de l\'envoi du mail', false);
        }
      });
  }

  public sendMailAsEmployee(mail : IEmail) : void{
    if(!this.user?.roles?.includes("Employee")) return;

    this.http.post<IEmail>(`${this.apiUrl}/Email/mail-as-employee`, mail)
      .subscribe({
        next: (response) => {
          this.toast.showToast('Email envoyé avec succès', true)
          this.router.navigateByUrl('/')
        },
        error: (error) => {
          this.toast.showToast('Echec de l\'envoi du mail', false);
        }
      });
  }

  public sendMailAsVisitor(mail: IEmail) : void{
    if(this.user) return;
    this.http.post<IEmail>(`${this.apiUrl}/Email/mail-as-visitor`, mail)
      .subscribe({
        next: (response) => {
          this.toast.showToast('Email envoyé avec succès', true)
          this.router.navigateByUrl('/')
        },
        error: (error) => {
          this.toast.showToast('Echec de l\'envoi du mail', false);
        }
      });
  }

}
