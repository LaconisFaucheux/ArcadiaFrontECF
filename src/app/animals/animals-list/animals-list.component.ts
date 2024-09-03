import {Component} from '@angular/core';
import {IAnimal} from "../../../shared/interfaces/animal.interface";
import {AsyncPipe, NgIf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AnimalService} from "../../../shared/services/animal.service";
import {Observable} from "rxjs";
import {HabitatService} from "../../../shared/services/habitat.service";
import {IHabitat} from "../../../shared/interfaces/habitat.interface";
import {AnimalFilterPipe} from "../../../shared/pipes/animal-filter.pipe";
import {LoadingSpinnerComponent} from "../../loading-spinner/loading-spinner.component";
import {ApiService} from "../../../shared/services/api.service";

@Component({
  selector: 'app-animals-list',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    AsyncPipe,
    NgIf,
    TitleCasePipe,
    AnimalFilterPipe,
    LoadingSpinnerComponent
  ],
  templateUrl: './animals-list.component.html',
  styleUrl: './animals-list.component.css'
})

export class AnimalsListComponent {
  public apiUrl = '';
  public imageApiUrl: string = '';
  public animals$: Observable<IAnimal[]>;
  public habitats$: Observable<IHabitat[]>;
  public filters: number[] = [];

  constructor(private animalService: AnimalService,
              protected habitatService: HabitatService,
              private apiService: ApiService) {
    this.apiUrl = this.apiService.getapiUrl();
    this.imageApiUrl = this.apiService.getImageApiUrl();
    this.animals$ = this.animalService.getAnimals();
    this.habitats$ = this.habitatService.getHabitats();
    this.habitats$.subscribe((habitats) => {
      for (let h of habitats) {
        this.filters.push(h.id)
      }
    })
  }

  ngOnInit() {
    this.animalService.fetchAllData();
    this.habitatService.fetchAllData();
  }

  public addOrRemoveFilters(event: any, habitatsID: number) {
    if (event.target.checked) {
      this.filters.push(habitatsID)
    } else {
      this.filters.splice(this.filters.indexOf(habitatsID), 1);
    }
  }

  public allFiltersActive() {
    this.filters = this.habitatService.getHabitatsIds();
  }

  public noFilterActive() {
    this.filters = [];
  }

  public isItChecked(habitatId: number): boolean {
    return this.filters.includes(habitatId);
  }
}
