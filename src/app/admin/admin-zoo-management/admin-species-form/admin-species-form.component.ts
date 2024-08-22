import { Component } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Observable} from "rxjs";
import {ISpecies} from "../../../../shared/interfaces/species.interface";
import {AnimalService} from "../../../../shared/services/animal.service";
import {AsyncPipe, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ISizeUnit} from "../../../../shared/interfaces/sizeUnit.interface";
import {IWeightUnit} from "../../../../shared/interfaces/weightUnit.interface";
import {IDiet} from "../../../../shared/interfaces/diet.interface";
import {HabitatService} from "../../../../shared/services/habitat.service";
import {IHabitat} from "../../../../shared/interfaces/habitat.interface";
import {ISpeciesDTO} from "../../../../shared/interfaces/speciesDTO.interface";

@Component({
  selector: 'app-admin-species-form',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    UpperCasePipe,
    ReactiveFormsModule,
    TitleCasePipe
  ],
  templateUrl: './admin-species-form.component.html',
  styleUrl: './admin-species-form.component.css'
})
export class AdminSpeciesFormComponent {
  // PROPS
  private id: string | null = null;
  public habitatsIdArray: number[] = [];

  // OBSERVABLES
  public species$: Observable<ISpecies | null> = new Observable<ISpecies | null>();
  public sizeUnits$: Observable<ISizeUnit[]> = new Observable<ISizeUnit[]>();
  public weightUnits$: Observable<IWeightUnit[]> = new Observable<IWeightUnit[]>();
  public diets$: Observable<IDiet[]> = new Observable<IDiet[]>();
  public habitats$: Observable<IHabitat[]> = new Observable<IHabitat[]>();

  // FORM CONTROLS
  Id = new FormControl<number | null>(null);
  Name = new FormControl<string>('');
  ScientificName = new FormControl<string>('');
  Description = new FormControl<string>('');
  MaleMaxSize = new FormControl<number>(0.0);
  FemaleMaxSize = new FormControl<number | null>(0.0);
  MaleMaxWeight = new FormControl<number>(0.0);
  FemaleMaxWeight = new FormControl<number | null>(0.0);
  IdSizeUnit = new FormControl<number>(0);
  IdWeightUnit = new FormControl<number>(0);
  Lifespan = new FormControl<number>(0);
  IdDiet = new FormControl<number>(0);

  constructor(private animalService: AnimalService,
              private habitatService: HabitatService,
              private activatedRoute: ActivatedRoute) {
    this.species$ = this.animalService.uniqueSpecies$
    this.sizeUnits$ = this.animalService.sizeUnit$
    this.weightUnits$ = this.animalService.weightUnit$
    this.diets$ = this.animalService.diets$
    this.habitats$ = this.habitatService.habitats$
}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      if (this.id) {
        this.animalService.fetchUniqueSpecies(parseInt(this.id));
      } else {
        this.species$ = new Observable<ISpecies | null>();
      }
    });

    if (this.id) {
      this.species$.subscribe(species => {
        if(species){
          if(species.id){
            this.Id.setValue(species.id);
          }
          this.Name.setValue(species.name);
          this.ScientificName.setValue(species.name);
          this.Description.setValue(species.description);
          this.MaleMaxSize.setValue(species.maleMaxSize);
          this.FemaleMaxSize.setValue(species.femaleMaxSize);
          this.MaleMaxWeight.setValue(species.maleMaxWeight);
          this.FemaleMaxWeight.setValue(species.femaleMaxWeight);
          this.IdDiet.setValue(species.idDiet);
          this.IdSizeUnit.setValue(species.idSizeUnit);
          this.IdWeightUnit.setValue(species.idWeightUnit);
          this.Lifespan.setValue(species.lifespan);
          for(let h of species.habitats){
            this.habitatsIdArray.push(h.id);
          }
        }
      })
    }

    this.animalService.fetchUnits();
    this.animalService.fetchDiets();
    this.habitatService.fetchAllData();
  }

  public addOrRemoveFilters(event: any, habitatsID: number) {
    if (event.target.checked) {
      this.habitatsIdArray.push(habitatsID)
    } else {
      this.habitatsIdArray.splice(this.habitatsIdArray.indexOf(habitatsID), 1);
    }
  }

  public isItChecked(habitatId: number): boolean {
    return this.habitatsIdArray.includes(habitatId);
  }

  public submit() {
    const fd = new FormData();

    const species: ISpeciesDTO = {
      id: this.id ? parseInt(this.id) : null,
      name: this.Name.value ?? '',
      scientificName: this.ScientificName.value ?? '',
      description: this.Description.value ?? '',
      maleMaxSize: this.MaleMaxSize.value ?? 0,
      femaleMaxSize: this.FemaleMaxSize.value ?? null,
      maleMaxWeight: this.MaleMaxWeight.value ?? 0,
      femaleMaxWeight: this.FemaleMaxWeight.value ?? null,
      idSizeUnit: this.IdSizeUnit.value ?? 0,
      idWeightUnit: this.IdWeightUnit.value ?? 0,
      lifespan: this.Lifespan.value ?? 0,
      idDiet: this.IdDiet.value ?? 0,
      idHabitatsArray: this.habitatsIdArray
    }

    if(species.id){
      fd.append("id", species.id.toString());
    }
    fd.append("name", species.name);
    fd.append("scientificName", species.scientificName);
    fd.append("description", species.description);
    fd.append("maleMaxSize", species.maleMaxSize.toString());
    fd.append("maleMaxWeight", species.maleMaxWeight.toString());
    if(species.femaleMaxSize) {
      fd.append("femaleMaxSize", species.femaleMaxSize.toString());
    }
    if(species.femaleMaxWeight) {
      fd.append("femaleMaxWeight", species.femaleMaxWeight.toString());
    }
    fd.append("idSizeUnit", species.idSizeUnit.toString());
    fd.append("idWeightUnit", species.idWeightUnit.toString());
    fd.append("lifespan", species.lifespan.toString());
    fd.append("idDiet", species.idDiet.toString());
    species.idHabitatsArray.forEach((h) => {
      fd.append("habitats", h.toString())
    })

    if(this.id){
      this.animalService.updateSpecies(this.id, fd)
    } else {
      this.animalService.createSpecies(fd);
    }

  }
}
