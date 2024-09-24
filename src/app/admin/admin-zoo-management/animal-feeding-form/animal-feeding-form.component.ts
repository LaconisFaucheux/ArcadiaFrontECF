import { Component } from '@angular/core';
import {AnimalsBySpeciesPipe} from "../../../../shared/pipes/animals-by-species.pipe";
import {AsyncPipe} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {ISpecies} from "../../../../shared/interfaces/species.interface";
import {IAnimal} from "../../../../shared/interfaces/animal.interface";
import {IWeightUnit} from "../../../../shared/interfaces/weightUnit.interface";
import {AnimalService} from "../../../../shared/services/animal.service";
import {AuthService} from "../../../../shared/services/auth.service";
import {IUser} from "../../../../shared/interfaces/user.interface";
import {IFeeding} from "../../../../shared/interfaces/feeding.interface";
import {IFeedingDTO} from "../../../../shared/interfaces/feedingDTO.interface";
import {FeedingService} from "../../../../shared/services/feeding.service";

@Component({
  selector: 'app-animal-feeding-form',
  standalone: true,
  imports: [
    AnimalsBySpeciesPipe,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './animal-feeding-form.component.html',
  styleUrl: './animal-feeding-form.component.css'
})
export class AnimalFeedingFormComponent {
  public species$: Observable<ISpecies[]> = new Observable<ISpecies[]>();
  public animals$: Observable<IAnimal[]> = new Observable<IAnimal[]>();
  public weightUnits$: Observable<IWeightUnit[]> = new Observable<IWeightUnit[]>();

  public user: IUser | undefined;
  public selectedSpecies: number = 0;

  //FORM CONTROLS
  public IdAnimal = new FormControl<number>(0, Validators.required);
  public Food = new FormControl<string>('', Validators.required);
  public Date = new FormControl<string>('', Validators.required);
  public Weight = new FormControl<number>(0);
  public IdWeightUnit = new FormControl<number>(0);

  constructor(private animalService: AnimalService,
              private authService: AuthService,
              private feedingService: FeedingService) {
    this.animals$ = this.animalService.animals$;
    this.species$ = this.animalService.species$;
    this.weightUnits$ = this.animalService.weightUnit$;
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    this.animalService.fetchAllData();
    this.animalService.fetchSpecies();
    this.animalService.fetchUnits();
  }

  public setSelectedSpecies(event: any) {
    if(event.target.value){
      this.selectedSpecies = event.target.value
    } else {
      return;
    }
  }

  public submit() {
    if(!this.user) return;

    const feeding: IFeedingDTO = {
      employeeEmail : this.user?.email,
      idAnimal : this.IdAnimal.value ?? 0,
      food : this.Food.value ?? '',
      date : this.Date.value ?? '',
      weight : this.Weight.value ?? 0,
      idWeightUnit : this.IdWeightUnit.value ?? 0
    }

    this.feedingService.postFeeding(feeding);
  }

}
