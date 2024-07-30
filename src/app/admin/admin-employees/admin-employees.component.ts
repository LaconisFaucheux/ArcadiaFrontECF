import { Component } from '@angular/core';
import {AdminEmployeesListComponent} from "./admin-employees-list/admin-employees-list.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-admin-employees',
  standalone: true,
  imports: [
    AdminEmployeesListComponent,
    RouterOutlet
  ],
  templateUrl: './admin-employees.component.html',
  styleUrl: './admin-employees.component.css'
})
export class AdminEmployeesComponent {

}
