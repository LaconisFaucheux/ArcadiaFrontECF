import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-admin-zoo-management',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './admin-zoo-management.component.html',
  styleUrl: './admin-zoo-management.component.css'
})
export class AdminZooManagementComponent {

}
