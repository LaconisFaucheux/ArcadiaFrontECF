import {Component, Input} from '@angular/core';
import {IHabitat} from "../../../shared/interfaces/habitat.interface";
import {IAnimal} from "../../../shared/interfaces/animal.interface";

@Component({
  selector: 'app-habitats-detail',
  standalone: true,
  imports: [],
  templateUrl: './habitats-detail.component.html',
  styleUrl: './habitats-detail.component.css'
})
export class HabitatsDetailComponent {
@Input() habitat: IHabitat | null = null;
@Input() inhabitants: IAnimal[] | null = null;
}
