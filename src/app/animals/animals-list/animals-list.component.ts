import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IAnimal} from "../../../shared/interfaces/animal.interface";
import {AsyncPipe, NgIf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AnimalService} from "../../../shared/services/animal.service";
import {Observable, Subscription} from "rxjs";
import {HabitatService} from "../../../shared/services/habitat.service";
import {IHabitat} from "../../../shared/interfaces/habitat.interface";

@Component({
  selector: 'app-animals-list',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    AsyncPipe,
    NgIf,
    TitleCasePipe
  ],
  templateUrl: './animals-list.component.html',
  styleUrl: './animals-list.component.css'
})

export class AnimalsListComponent {
  //public animals: IAnimal[] = [];
  //public subscription: Subscription = new Subscription();
  public animals$: Observable<IAnimal[]>;
  public habitats$: Observable<IHabitat[]>;
  title = 'test';

  constructor(private animalService: AnimalService,
              private habitatService: HabitatService) {
    this.animals$ = this.animalService.getAnimals();
    this.habitats$ = this.habitatService.getHabitats();
  }

  ngOnInit(): void {
    // this.subscription.add(this.animalService.animals$.subscribe(animals => {
    //   this.animals = animals;
    // }));
  }

  public selectAnimal(index: number): void {
    this.animalService.setAnimal(index);
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }

}
