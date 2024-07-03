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

  private rnd = Math.floor(Math.random() * (this.animals.value.length + 1));

  private randomAnimal: BehaviorSubject<IAnimal | null> = new BehaviorSubject<IAnimal | null>(null);
  public randomAnimal$ = this.randomAnimal.asObservable();


  constructor(private http: HttpClient) {
    this.fetchAllData();
  }

  fetchAllData() {
    this.http.get<IAnimal[]>('https://localhost:7015/api/Animals')
      .subscribe(animals => {
        this.animals.next(animals)
        this.updateRandomAnimal()
      });
  }

  fetchUniqueAnimal(id: number){
    this.http.get<IAnimal>(`https://localhost:7015/api/Animals/${id}`)
      .subscribe(animal => {
        this.animal.next(animal)
      });
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

  //SETTERS
  // public setInhabitants(habitatId: number): void {
  //   this.inhabitants.next(
  //     this.animals.value.filter(a => a.speciesData.habitats.some(
  //       h => h.id === habitatId))
  //   );
  // }

  // public setAnimal(index: number): void {
  //   let tmp: IAnimal | undefined = this.animals.value.find(a => a.id === index);
  //   if (tmp) {
  //     this.animal.next(tmp);
  //   }
  // }

  private updateRandomAnimal() {
    const animals = this.animals.value;
    if (animals.length > 0) {
      const rnd = Math.floor(Math.random() * animals.length);
      this.randomAnimal.next(animals[rnd]);
    }
  }


}
