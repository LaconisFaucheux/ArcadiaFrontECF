import { Component } from '@angular/core';
import {AnimalsListComponent} from "./animals-list/animals-list.component";
import {AnimalsDetailsComponent} from "./animals-details/animals-details.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [
    AnimalsListComponent,
    AnimalsDetailsComponent,
    RouterOutlet
  ],
  templateUrl: './animals.component.html',
  styleUrl: './animals.component.css'
})
export class AnimalsComponent {}
