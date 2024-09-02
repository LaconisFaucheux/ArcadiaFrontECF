import { Injectable } from '@angular/core';
import {AnimalStat} from "../interfaces/animalStats.interface";
import {BehaviorSubject} from "rxjs";
import {HabitatStat} from "../interfaces/habitatStats.interface";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private animalsStats: BehaviorSubject<AnimalStat[]> = new BehaviorSubject<AnimalStat[]>([]);
  public animalsStats$ = this.animalsStats.asObservable();

  private animalStat: BehaviorSubject<AnimalStat | null> = new BehaviorSubject<AnimalStat | null>(null);
  public animalStat$ = this.animalStat.asObservable();

  private habitatsStats: BehaviorSubject<HabitatStat[]> = new BehaviorSubject<HabitatStat[]>([]);
  public habitatsStats$ = this.habitatsStats.asObservable();

  private habitatStat: BehaviorSubject<HabitatStat | null> = new BehaviorSubject<HabitatStat | null>(null);
  public habitatStat$ = this.habitatStat.asObservable();

  constructor(private router: Router, private http: HttpClient) { }

  //Animals
  ////FETCH
  public fetchAnimalsStats(){
    this.http.get<AnimalStat[]>('https://localhost:7015/api/Stats/animals').subscribe(
      animalsStat => this.animalsStats.next(animalsStat),
    );
  }

  ////POST
  public createAnimalStat(animalStat: AnimalStat){
    this.http.post('https://localhost:7015/api/Stats/animals/', animalStat).subscribe();
  }

  ////PUT
  public updateAnimalStat(id: string, animalStat: AnimalStat){
    this.http.put(`https://localhost:7015/api/Stats/animals/${id}`, animalStat)
  }

  ////DELETE
  public deleteAnimalStat(id: string){
    this.http.delete(`https://localhost:7015/api/Stats/animals/${id}`).subscribe({
      next: (response) => {
        alert('Statistique supprimée avec succès')
        this.fetchAnimalsStats();
      },
      error: error => alert('Echec de la suppression de la statistique')
    });
  }

//////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  //Habitats
  ////FETCH
  public fetchHabitatsStats(){
    this.http.get<HabitatStat[]>('https://localhost:7015/api/Stats/habitats').subscribe(
      habitatStats => this.habitatsStats.next(habitatStats)
    )
  }

  ////POST
  public createHabitatsStats(habitatStat: HabitatStat){
    this.http.post('https://localhost:7015/api/Stats/habitats', habitatStat).subscribe();
  }

  ////PUT
  public updateHabitatsStats(id: string, habitatStat: HabitatStat){
    this.http.put(`https://localhost:7015/api/Stats/habitats/${id}`, habitatStat).subscribe();
  }

  ////DELETE
  public deleteHabitatsStats(id: string){

    console.log(`habitats ${id}`);

    this.http.delete(`https://localhost:7015/api/Stats/habitats/${id}`).subscribe({
      next: (response) => {
        alert('Statistique supprimée avec succès')
        this.fetchHabitatsStats();
      },
      error: error => alert('Echec de la suppression de la statistique')
    })
  }
}
