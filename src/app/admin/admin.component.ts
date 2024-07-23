import { Component } from '@angular/core';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    DashboardComponent,
    RouterOutlet
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
