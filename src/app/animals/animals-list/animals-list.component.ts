import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IAnimal} from "../../../shared/interfaces/animal.interface";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AnimalService} from "../../../shared/services/animal.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-animals-list',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './animals-list.component.html',
  styleUrl: './animals-list.component.css'
})
export class AnimalsListComponent {
  public animals: IAnimal[] | null = null;
  public subscription: Subscription = new Subscription();
  title = 'test';

  constructor(private animalService: AnimalService) {
  }

  ngOnInit(): void {
    this.subscription.add(this.animalService.animals$.subscribe(animals => {
      this.animals = animals;
    }));
  }

  public selectAnimal(index: number): void {
    this.animalService.selectAnimal(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
