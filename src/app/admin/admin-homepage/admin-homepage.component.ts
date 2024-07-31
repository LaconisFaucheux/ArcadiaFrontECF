import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {IUser} from "../../../shared/interfaces/user.interface";
import {UsersService} from "../../../shared/services/users.service";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {AdminEmployeesListComponent} from "../admin-employees/admin-employees-list/admin-employees-list.component";

@Component({
  selector: 'app-admin-homepage',
  standalone: true,
  imports: [
    DashboardComponent,
    AdminEmployeesListComponent
  ],
  templateUrl: './admin-homepage.component.html',
  styleUrl: './admin-homepage.component.css'
})
export class AdminHomepageComponent {
  public email = sessionStorage.getItem('user-email');
  public roles = sessionStorage.getItem('user-roles');

}
