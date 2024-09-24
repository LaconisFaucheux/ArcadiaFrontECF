import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {IFeeding} from "../../../../shared/interfaces/feeding.interface";
import {IUser} from "../../../../shared/interfaces/user.interface";
import {FeedingService} from "../../../../shared/services/feeding.service";
import {AuthService} from "../../../../shared/services/auth.service";
import {AsyncPipe, DatePipe} from "@angular/common";
import {LoadingSpinnerComponent} from "../../../loading-spinner/loading-spinner.component";
import {RouterLink} from "@angular/router";
import {ISpecies} from "../../../../shared/interfaces/species.interface";
import {AnimalService} from "../../../../shared/services/animal.service";
import {IAnimal} from "../../../../shared/interfaces/animal.interface";
import {AnimalsBySpeciesPipe} from "../../../../shared/pipes/animals-by-species.pipe";
import {ReactiveFormsModule} from "@angular/forms";
import {FeedingFilterPipe} from "../../../../shared/pipes/feeding-filter.pipe";

@Component({
  selector: 'app-admin-animal-feeding',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    LoadingSpinnerComponent,
    RouterLink,
    AnimalsBySpeciesPipe,
    ReactiveFormsModule,
    FeedingFilterPipe
  ],
  templateUrl: './admin-animal-feeding.component.html',
  styleUrl: './admin-animal-feeding.component.css'
})
export class AdminAnimalFeedingComponent {

  public feedings$: Observable<IFeeding[]> = new Observable<IFeeding[]>();
  public user$: Observable<IUser | undefined> = new Observable<IUser | undefined>();
  public species$: Observable<ISpecies[]> = new Observable<ISpecies[]>();
  public animals$: Observable<IAnimal[]> = new Observable<IAnimal[]>();
  public selectedSpecies: number = 0;
  public selectedName: string = 'Tous';

  constructor(
    private feedingService: FeedingService,
    private animalService: AnimalService,
    private authService: AuthService) {
    this.feedings$ = feedingService.feedings$;
    this.species$ = animalService.species$;
    this.animals$ = animalService.animals$;
    this.user$ = this.authService.user$;
  }

  ngOnInit() {
    this.feedingService.fetchFeedings()
    this.animalService.fetchSpecies()
    this.animalService.fetchAllData()
  }

  public setSelectedSpecies(event: any) {
    if(event.target.value){
      this.selectedSpecies = event.target.value
    } else {
      return;
    }
  }

  public setSelectedName(event: any) {
    if(event.target.value){
      this.selectedName = event.target.value
    } else {
      return;
    }
  }




}
