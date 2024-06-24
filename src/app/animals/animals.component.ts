import { Component } from '@angular/core';
import {IAnimal} from "../../shared/interfaces/animal.interface";
import {AnimalsListComponent} from "./animals-list/animals-list.component";
import {AnimalsDetailsComponent} from "./animals-details/animals-details.component";
import {AnimalService} from "../../shared/services/animal.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [
    AnimalsListComponent,
    AnimalsDetailsComponent
  ],
  templateUrl: './animals.component.html',
  styleUrl: './animals.component.css'
})
export class AnimalsComponent {
  animals: IAnimal[] = []
  public subscription: Subscription = new Subscription() ;
  animal: IAnimal | null = null;

  constructor(private animalService: AnimalService) {}

  ngOnInit(): void {
    this.subscription.add(this.animalService.animals$.subscribe(animals => {
      this.animals = animals;
    }));

    this.subscription.add(this.animalService.animal$.subscribe(animal => {
      this.animal = animal;
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public selectAnimal(index: number): void {
    this.animalService.selectAnimal(index);
  }
}
