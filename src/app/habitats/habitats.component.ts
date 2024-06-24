import { Component } from '@angular/core';
import {HabitatsDetailComponent} from "./habitats-detail/habitats-detail.component";
import {HabitatsListComponent} from "./habitats-list/habitats-list.component";
import {IHabitat} from "../../shared/interfaces/habitat.interface";
import {IAnimal} from "../../shared/interfaces/animal.interface";
import {HabitatService} from "../../shared/services/habitat.service";
import {AnimalService} from "../../shared/services/animal.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-habitats',
  standalone: true,
  imports: [
    HabitatsDetailComponent,
    HabitatsListComponent
  ],
  templateUrl: './habitats.component.html',
  styleUrl: './habitats.component.css'
})
export class HabitatsComponent {
  habitats: IHabitat[] = []

  habitat: IHabitat| null = null;

  inhabitants: IAnimal[] = []

  public sub: Subscription = new Subscription();

  constructor(private habitatService: HabitatService, private animalService: AnimalService) {
  }

  ngOnInit() {
    this.sub.add(this.habitatService.habitats$.subscribe(
      h => this.habitats = h
    ))

    this.sub.add(this.habitatService.habitat$.subscribe(
      h=> this.habitat = h
    ))

    this.animalService.getInhabitants(this.habitat!.id)

    this.sub.add(this.animalService.inhabitants$.subscribe(
      i => this.inhabitants = i
    ))

  }

  public selectHabitat (index: number){
    this.habitatService.selectHabitat(index)
    this.animalService.getInhabitants(index)
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
