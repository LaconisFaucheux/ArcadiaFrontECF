import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {IAnimal} from "../interfaces/animal.interface";
import {HttpClient} from "@angular/common/http";

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


  constructor(private http: HttpClient) {}

  fetchAllData() {
    this.http.get<IAnimal[]>('https://localhost:7015/api/Animals')
      .subscribe(animals => {
        this.animals.next(animals)
      });
  }

  fetchUniqueAnimal(id: number){
    this.http.get<IAnimal>(`https://localhost:7015/api/Animals/${id}`)
      .subscribe(animal => {
        this.animal.next(animal)
      });
  }

  fetchRandomAnimal(){
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

  fetchInhabitantsByHabitatId(habitatId: number){
    this.http.get<IAnimal[]>(`https://localhost:7015/api/Animals/byHabitat/${habitatId}`)
      .subscribe(animals => {
        this.inhabitants.next(animals)
      });
  }

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
