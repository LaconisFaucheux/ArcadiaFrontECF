import { Component } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {Observable} from "rxjs";
import {IUser} from "../../shared/interfaces/user.interface";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  public mail = 'contact@arcadia.com';
  public user$: Observable<IUser | undefined> = new Observable(undefined);
  public footerBgColor: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.user$ = this.authService.user$;
    this.user$.subscribe((user) => {
      this.footerBgColor = user === undefined ? '#402905' : '#06631d';
    })
  }


}
