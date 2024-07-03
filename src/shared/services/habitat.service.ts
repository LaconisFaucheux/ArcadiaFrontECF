import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IHabitat} from "../interfaces/habitat.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HabitatService {
  //PROPS
  private habitats: BehaviorSubject<IHabitat[]> = new BehaviorSubject<IHabitat[]>([]);
  public habitats$ = this.habitats.asObservable();

  private habitat: BehaviorSubject<IHabitat> = new BehaviorSubject(this.habitats.value[0]);
  public habitat$ = this.habitat.asObservable();

  constructor(private http: HttpClient) {
    this.fetchdata();
  }

  fetchdata() {
    this.http.get<IHabitat[]>('https://localhost:7015/api/Habitats')
      .subscribe(habitats => this.habitats.next(habitats));
  }

  fetchUniqueHabitat(id: number){
    this.http.get<IHabitat>(`https://localhost:7015/api/Habitats/${id}`)
      .subscribe(habitat => this.habitat.next(habitat));
  }

  //GETTERS
  getHabitats(): Observable<IHabitat[]> {
    return this.habitats$;
  }
  getHabitatsIds(): number[] {
    const hab = this.habitats.value;
    const arr: number[] = []
    for(let h of hab){
      arr.push(h.id);
    }
    return arr;
  }
  getHabitat(): Observable<IHabitat> {
    return this.habitat$;
  }

  //METHODS
  // public selectHabitat(id: number) {
  //   let tmp = this.habitats.value.find((habitat) => habitat.id === id);
  //   if (tmp) {
  //     this.habitat.next(tmp);
  //   }
  // }
}
