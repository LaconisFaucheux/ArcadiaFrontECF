import {Component, Input} from '@angular/core';
import {IHabitat} from "../../../shared/interfaces/habitat.interface";
import {HabitatsDetailComponent} from "../habitats-detail/habitats-detail.component";

@Component({
  selector: 'app-habitats-list',
  standalone: true,
  imports: [
    HabitatsDetailComponent
  ],
  templateUrl: './habitats-list.component.html',
  styleUrl: './habitats-list.component.css'
})
export class HabitatsListComponent {
  @Input() habitats: IHabitat[] | null = null;
}
