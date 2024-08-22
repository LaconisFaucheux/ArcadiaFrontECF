import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IHabitat} from "../interfaces/habitat.interface";
import {HttpClient} from "@angular/common/http";
import {IHabitatDTO} from "../interfaces/habitatDTO.interface";

@Injectable({
  providedIn: 'root'
})
export class HabitatService {
  //PROPS
  private habitats: BehaviorSubject<IHabitat[]> = new BehaviorSubject<IHabitat[]>([]);
  public habitats$ = this.habitats.asObservable();

  private habitat: BehaviorSubject<IHabitat> = new BehaviorSubject(this.habitats.value[0]);
  public habitat$ = this.habitat.asObservable();

  constructor(private http: HttpClient) {}

  //GET
  fetchAllData() {
    this.http.get<IHabitat[]>('https://localhost:7015/api/Habitats')
      .subscribe(habitats => this.habitats.next(habitats));
  }

  fetchUniqueHabitat(id: number){
    this.http.get<IHabitat>(`https://localhost:7015/api/Habitats/${id}`)
      .subscribe(habitat => this.habitat.next(habitat));
  }

  //POST
  createHabitat(fd: FormData){
    this.http.post(`https://localhost:7015/api/Habitats`, fd)
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
  updateHabitat(id: string, fd: FormData){
    this.http.put(`https://localhost:7015/api/Habitats/${id}/`, fd)
      .subscribe({
        next: (response) => {
          console.log('Request successful', response);
        },
        error: (error) => {
          console.error('Request failed', error);
        }
      });
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
}
