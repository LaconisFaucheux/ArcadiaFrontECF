import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IAnimal} from "../../../shared/interfaces/animal.interface";
import {AsyncPipe, NgIf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AnimalService} from "../../../shared/services/animal.service";
import {Observable, Subscription} from "rxjs";
import {HabitatService} from "../../../shared/services/habitat.service";
import {IHabitat} from "../../../shared/interfaces/habitat.interface";
import {AnimalFilterPipe} from "../../../shared/pipes/animal-filter.pipe";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-animals-list',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    AsyncPipe,
    NgIf,
    TitleCasePipe,
    AnimalFilterPipe
  ],
  templateUrl: './animals-list.component.html',
  styleUrl: './animals-list.component.css'
})

export class AnimalsListComponent {
  public animals$: Observable<IAnimal[]>;
  public habitats$: Observable<IHabitat[]>;
  public filters: number[] = this.habitatService.getHabitatsIds();

  title = 'test';

  constructor(private animalService: AnimalService,
              protected habitatService: HabitatService) {
    this.animals$ = this.animalService.getAnimals();
    this.habitats$ = this.habitatService.getHabitats();
  }

  ngOnInit() {
  }

  public selectAnimal(index: number): void {
    this.animalService.setAnimal(index);
  }

  public addOrRemoveFilters(event: any,habitatsID: number){
    if(event.target.checked){
      this.filters.push(habitatsID)
    } else {
      this.filters.splice(this.filters.indexOf(habitatsID), 1);
    }
  }

  public allFiltersActive(){
    this.filters = this.habitatService.getHabitatsIds();
  }

  public noFilterActive() {
    this.filters = [];
  }

  public isItChecked(habitatId: number): boolean{
    return this.filters.includes(habitatId);
  }
}
