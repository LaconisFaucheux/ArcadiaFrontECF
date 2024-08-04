import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-admin-zoo-management-landing-page',
  standalone: true,
    imports: [
        RouterLink,
        RouterOutlet
    ],
  templateUrl: './admin-zoo-management-landing-page.component.html',
  styleUrl: './admin-zoo-management-landing-page.component.css'
})
export class AdminZooManagementLandingPageComponent {

}
