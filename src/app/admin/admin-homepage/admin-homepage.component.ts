import { Component } from '@angular/core';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {AdminEmployeesListComponent} from "../admin-employees/admin-employees-list/admin-employees-list.component";
import {TitleCasePipe, UpperCasePipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-admin-homepage',
  standalone: true,
  imports: [
    DashboardComponent,
    AdminEmployeesListComponent,
    UpperCasePipe,
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './admin-homepage.component.html',
  styleUrl: './admin-homepage.component.css'
})
export class AdminHomepageComponent {
  private email = sessionStorage.getItem('user-email');
  protected roles = sessionStorage.getItem('user-roles');
  public greetings = this.email === null ? '' : this.email.split('@')[0];

}
