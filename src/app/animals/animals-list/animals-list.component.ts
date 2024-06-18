import {Component, Input} from '@angular/core';
import {IAnimal} from "../../../shared/interfaces/animal.interface";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-animals-list',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './animals-list.component.html',
  styleUrl: './animals-list.component.css'
})
export class AnimalsListComponent {
  @Input() animals: IAnimal[] | null = null;
  title = 'test';

}
