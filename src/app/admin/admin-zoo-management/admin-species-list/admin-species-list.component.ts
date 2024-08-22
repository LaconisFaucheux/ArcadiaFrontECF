import { Component } from '@angular/core';
import {AsyncPipe, TitleCasePipe} from "@angular/common";
import {LoadingSpinnerComponent} from "../../../loading-spinner/loading-spinner.component";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {AnimalService} from "../../../../shared/services/animal.service";
import {HabitatService} from "../../../../shared/services/habitat.service";
import {ISpecies} from "../../../../shared/interfaces/species.interface";

@Component({
  selector: 'app-admin-species-list',
  standalone: true,
  imports: [
    AsyncPipe,
    LoadingSpinnerComponent,
    RouterLink,
    TitleCasePipe
  ],
  templateUrl: './admin-species-list.component.html',
  styleUrl: './admin-species-list.component.css'
})
export class AdminSpeciesListComponent {

  public species$: Observable<ISpecies[]> = new Observable<ISpecies[]>();

  constructor(private animalService: AnimalService) {
    this.species$ = animalService.species$;
  }

  ngOnInit(): void {
    this.animalService.fetchSpecies();
  }

  public getPath(id: number | undefined): string {
    if (id != undefined) {
      return `detailed/${id}`;
    } else {
      return 'register';
    }

  }

}
