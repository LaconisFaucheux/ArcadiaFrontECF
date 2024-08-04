import {Component} from '@angular/core';
import {AsyncPipe, TitleCasePipe} from "@angular/common";
import {EmployeeFilterPipe} from "../../../../shared/pipes/employee-filter.pipe";
import {LoadingSpinnerComponent} from "../../../loading-spinner/loading-spinner.component";
import {RouterLink} from "@angular/router";
import {IAnimal} from "../../../../shared/interfaces/animal.interface";
import {Observable} from "rxjs";
import {AnimalService} from "../../../../shared/services/animal.service";
import {AnimalFilterPipe} from "../../../../shared/pipes/animal-filter.pipe";
import {IHabitat} from "../../../../shared/interfaces/habitat.interface";
import {HabitatService} from "../../../../shared/services/habitat.service";

@Component({
  selector: 'app-admin-animals-list',
  standalone: true,
  imports: [
    AsyncPipe,
    EmployeeFilterPipe,
    LoadingSpinnerComponent,
    RouterLink,
    AnimalFilterPipe,
    TitleCasePipe
  ],
  templateUrl: './admin-animals-list.component.html',
  styleUrl: './admin-animals-list.component.css'
})
export class AdminAnimalsListComponent {

  public animals$: Observable<IAnimal[]> = new Observable<IAnimal[]>();
  public habitats$: Observable<IHabitat[]> = new Observable<IHabitat[]>();
  public filters: number[] = [];

  constructor(private animalService: AnimalService, protected habitatService: HabitatService) {
    this.animals$ = animalService.animals$;
    this.habitats$ = habitatService.habitats$
    this.habitats$.subscribe((habitats) => {
      for (let h of habitats) {
        this.filters.push(h.id)
      }
    })
    console.log(this.filters)
    console.log(this.habitats$)
  }

  ngOnInit(): void {
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

  public getPath(id: number | undefined): string {
    if (id != undefined) {
      return `detailed/${id}`;
    } else {
      return 'register';
    }

  }
}
