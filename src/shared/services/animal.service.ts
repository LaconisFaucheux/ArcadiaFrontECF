import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {IAnimal} from "../interfaces/animal.interface";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {ISpecies} from "../interfaces/species.interface";
import {ISizeUnit} from "../interfaces/sizeUnit.interface";
import {IWeightUnit} from "../interfaces/weightUnit.interface";
import {IDiet} from "../interfaces/diet.interface";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private animals: BehaviorSubject<IAnimal[]> = new BehaviorSubject<IAnimal[]>([]);
  public animals$ = this.animals.asObservable();

  private animal: BehaviorSubject<IAnimal> = new BehaviorSubject<IAnimal>(this.animals.value[0]);
  public animal$ = this.animal.asObservable();

  private inhabitants: BehaviorSubject<IAnimal[]> = new BehaviorSubject<IAnimal[]>([]);
  public inhabitants$ = this.inhabitants.asObservable();

  private animalsListLength: number = 0;

  private randomAnimal: BehaviorSubject<IAnimal | null> = new BehaviorSubject<IAnimal | null>(null);
  public randomAnimal$ = this.randomAnimal.asObservable();

  private species: BehaviorSubject<ISpecies[]> = new BehaviorSubject<ISpecies[]>([]);
  public species$ = this.species.asObservable();

  private uniqueSpecies: BehaviorSubject<ISpecies | null> = new BehaviorSubject<ISpecies | null>(null);
  public uniqueSpecies$ = this.uniqueSpecies.asObservable();

  private sizeUnit: BehaviorSubject<ISizeUnit[]> = new BehaviorSubject<ISizeUnit[]>([]);
  public sizeUnit$ = this.sizeUnit.asObservable();

  private weightUnit: BehaviorSubject<IWeightUnit[]> = new BehaviorSubject<IWeightUnit[]>([]);
  public weightUnit$ = this.weightUnit.asObservable();

  private diets: BehaviorSubject<IDiet[]> = new BehaviorSubject<IDiet[]>([]);
  public diets$ = this.diets.asObservable();


  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  //GET
  fetchDiets(){
    this.http.get<IDiet[]>(
      'https://localhost:7015/api/Diets')
      .subscribe(diets => {
        this.diets.next(diets)
      })
  }

  fetchUnits(){
    this.http.get<ISizeUnit[]>(
      'https://localhost:7015/api/SizeUnits')
      .subscribe(sizeUnit => {
        this.sizeUnit.next(sizeUnit)
      });
    this.http.get<IWeightUnit[]>(
      'https://localhost:7015/api/WeightUnits')
      .subscribe(weightUnit => {
        this.weightUnit.next(weightUnit)
      })
  }

  fetchSpecies() {
    this.http.get<ISpecies[]>(
      'https://localhost:7015/api/Species')
      .subscribe(species => {
        this.species.next(species)
    });
  }

  fetchUniqueSpecies(id: number) {
    this.http.get<ISpecies>(
      `https://localhost:7015/api/Species/${id}`)
      .subscribe(species => {
        this.uniqueSpecies.next(species)
    });
  }

  fetchAllData() {
    this.http.get<IAnimal[]>(
      'https://localhost:7015/api/Animals')
      .subscribe(animals => {
        this.animals.next(animals)
      });
  }

  fetchUniqueAnimal(id: number) {
    this.http.get<IAnimal>(`https://localhost:7015/api/Animals/${id}`)
      .subscribe(animal => {
        this.animal.next(animal)
      });
  }

  fetchRandomAnimal() {
    let rnd;
    this.http.get<number>(`https://localhost:7015/api/Animals/length`)
      .subscribe(length => {
        this.animalsListLength = length
        rnd = Math.floor(Math.random() * (this.animalsListLength + 1));
        this.http.get<IAnimal>(`https://localhost:7015/api/Animals/${rnd}`)
          .subscribe(animal => {
            this.randomAnimal.next(animal)
          });
      })
  }

  fetchInhabitantsByHabitatId(habitatId: number) {
    this.http.get<IAnimal[]>(`https://localhost:7015/api/Animals/byHabitat/${habitatId}`)
      .subscribe(animals => {
        this.inhabitants.next(animals)
      });
  }

  //POST
  createAnimal(fd: FormData) {
    this.http.post(`https://localhost:7015/api/Animals`, fd)
      .subscribe({
        next: (response) => {
          console.log('Request successful', response);
        },
        error: (error) => {
          console.error('Request failed', error);
        }
      });
  }

  createSpecies(fd: FormData) {
    this.http.post(`https://localhost:7015/api/Species`, fd)
      .subscribe({
        next: (response) => {
          console.log('Request successful', response);
        },
        error: (error) => {
          console.error('Request failed', error);
        }
      });
  }

  //PUT
  updateAnimal(animalId: string, fd: FormData) {
    this.http.put(`https://localhost:7015/api/Animals/${animalId}/`, fd)
      .subscribe({
        next: (response) => {
          console.log('Request successful', response);
        },
        error: (error) => {
          console.error('Request failed', error);
        }
      });
  }

  updateSpecies(speciesId: string, fd: FormData) {
    this.http.put(`https://localhost:7015/api/Species/${speciesId}/`, fd)
      .subscribe({
        next: (response) => {
          console.log('Request successful', response);
        },
        error: (error) => {
          console.error('Request failed', error);
        }
      });
  }

  //DELETE

  //GETTERS
  getAnimals(): Observable<IAnimal[]> {
    return this.animals$;
  }

  getAnimal(): Observable<IAnimal> {
    return this.animal$;
  }

  getInhabitants(): Observable<IAnimal[]> {
    return this.inhabitants$;
  }
}
