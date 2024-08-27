import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {IUser} from "../../../shared/interfaces/user.interface";
import {AuthService} from "../../../shared/services/auth.service";
import {UsersService} from "../../../shared/services/users.service";

@Component({
  selector: 'app-admin-change-password',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin-change-password.component.html',
  styleUrl: './admin-change-password.component.css'
})
export class AdminChangePasswordComponent {

  constructor(private authService: AuthService, private userService: UsersService) {
  }

  ngOnInit() {
    this.generatePassword()
  }

  //FORM CONTROLS
  public Email = new FormControl('', [Validators.required, Validators.email]);
  public OldPassword = new FormControl<string>('', [Validators.required])
  public NewPassword = new FormControl<string>('', [Validators.required])
  public NewPasswordCheck = new FormControl('', [Validators.required])
  public RandomPassword = new FormControl('')

  submit() {
    if (this.NewPassword.value !== this.NewPasswordCheck.value) {
      alert('Le nouveau mot de passe et sa confirmation ne correspondent pas!');
      return;
    }

    const user = this.authService.getUser();
    if (!user) return

    const fd = new FormData();

    if (user.id) {
      fd.append('id', user.id)
    } else {
      return;
    }

    if(user.email === this.Email.value) {
      fd.append('email', this.Email.value)
    } else {
      alert('Erreur d\'authentification');
      return;
    }

    if(this.OldPassword.value) {
      fd.append('oldPassword', this.OldPassword.value?.toString());
    } else {
      alert('Tous les champs sont REQUIS');
      return;
    }

    if(this.NewPassword.value) {
      fd.append('newPassword', this.NewPassword.value?.toString());
    } else {
      alert('Tous les champs sont REQUIS');
      return;
    }

    this.authService.updatePassword(user.id, fd);


  }

  generatePassword(): string {
    const pwd = this.userService.generatePassword()
    this.RandomPassword.setValue(pwd)
    return pwd;
  }

}
