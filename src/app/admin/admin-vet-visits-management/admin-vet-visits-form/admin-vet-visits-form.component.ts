import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IAnimal} from "../../../../shared/interfaces/animal.interface";
import {Observable} from "rxjs";
import {IWeightUnit} from "../../../../shared/interfaces/weightUnit.interface";
import {IHealth} from "../../../../shared/interfaces/health.interface";
import {AnimalService} from "../../../../shared/services/animal.service";
import {IUser} from "../../../../shared/interfaces/user.interface";
import {AuthService} from "../../../../shared/services/auth.service";
import {ISpecies} from "../../../../shared/interfaces/species.interface";
import {AsyncPipe} from "@angular/common";
import {AnimalsBySpeciesPipe} from "../../../../shared/pipes/animals-by-species.pipe";
import {IVetReport} from "../../../../shared/interfaces/vet-reports.interface";
import {IVetReportDTO} from "../../../../shared/interfaces/vet-reportDTO.interface";
import {VetReportsService} from "../../../../shared/services/vet-reports.service";

@Component({
  selector: 'app-admin-vet-visits-form',
  standalone: true,
  imports: [
    FormsModule,
    AsyncPipe,
    AnimalsBySpeciesPipe,
    ReactiveFormsModule
  ],
  templateUrl: './admin-vet-visits-form.component.html',
  styleUrl: './admin-vet-visits-form.component.css'
})
export class AdminVetVisitsFormComponent {

  public animals$: Observable<IAnimal[]> = new Observable<IAnimal[]>();
  public weightUnits$: Observable<IWeightUnit[]> = new Observable<IWeightUnit[]>();
  public health$: Observable<IHealth[]> = new Observable<IHealth[]>();
  public user$: Observable<IUser | undefined> = new Observable(undefined);
  public species$: Observable<ISpecies[]> = new Observable<ISpecies[]>

  public selectedSpecies: number | null = null;

  //FORM CONTROLS
  public Food = new FormControl<string>('');
  public FoodWeight = new FormControl<number>(0);
  public IdWeightUnit = new FormControl<number>(0);
  public Observations = new FormControl<string>('');
  public IdAnimal = new FormControl<number>(0);
  public IdVet = new FormControl<string>('');
  public IdHealth = new FormControl<number>(0);


  constructor(private animalService: AnimalService, private authService: AuthService, private reportService: VetReportsService) {
    this.animals$ = this.animalService.animals$;
    this.weightUnits$ = this.animalService.weightUnit$;
    this.health$ = this.animalService.health$;
    this.species$ = this.animalService.species$;
    this.user$ = this.authService.user$;
  }

  ngOnInit() {
    this.animalService.fetchAllData()
    this.animalService.fetchUnits()
    this.animalService.fetchHealth()
    this.animalService.fetchSpecies()

    this.user$.subscribe(u => {
      if(u){
        if(u.email) this.IdVet.setValue(u.email)
      }

    })
  }

  setSelectedSpecies(event: any) {
    if(event.target.value){
      this.selectedSpecies = event.target.value
    }
    else{
      return;
    }
  }

  public submit(){

    const vetReportDTO: IVetReportDTO = {
      food: this.Food.value ?? '',
      foodWeight: this.FoodWeight.value ?? 0,
      idWeightUnit: this.IdWeightUnit.value ?? 0,
      observations: this.Observations.value ?? '',
      idAnimal: this.IdAnimal.value ?? 0,
      idVet: this.IdVet.value ?? '',
      healthId : this.IdHealth.value ?? 0
    }

    const fd = new FormData();

    fd.append("food", vetReportDTO.food);
    fd.append("foodWeight", vetReportDTO.foodWeight.toString());
    fd.append("idWeightUnit", vetReportDTO.idWeightUnit.toString());
    fd.append("observations", vetReportDTO.observations);
    fd.append("idAnimal", vetReportDTO.idAnimal.toString());
    fd.append("idVet", vetReportDTO.idVet.toString());
    fd.append("healthId", vetReportDTO.healthId.toString());

    this.reportService.createReport(fd);
  }
}
