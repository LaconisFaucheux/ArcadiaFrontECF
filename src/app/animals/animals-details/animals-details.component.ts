import {Component, Input} from '@angular/core';
import {IAnimal} from "../../../shared/interfaces/animal.interface";

@Component({
  selector: 'app-animals-details',
  standalone: true,
  imports: [],
  templateUrl: './animals-details.component.html',
  styleUrl: './animals-details.component.css'
})
export class AnimalsDetailsComponent {
  @Input() animal: IAnimal | null = null;

}
