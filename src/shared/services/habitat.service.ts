import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IHabitat} from "../interfaces/habitat.interface";
import {IAnimal} from "../interfaces/animal.interface";

@Injectable({
  providedIn: 'root'
})
export class HabitatService {
  //PROPS
  private habitats: BehaviorSubject<IHabitat[]> = new BehaviorSubject<IHabitat[]>([
    {
      id: 1,
      name: "savane",
      description: "descriptif de la savane",
      pics: [
        {
          id: 1,
          slug: "images/habitats/Savane.jpg",
          miniSlug: "x",
          idHabitat: 1
        }
      ]
    },
    {
      id: 2,
      name: "jungle",
      description: "Descriptif de la jungle",
      pics: [
        {
          id: 2,
          slug: "images/habitats/Jungle.jpg",
          miniSlug: "x",
          idHabitat: 2
        }
      ]
    },
    {
      id: 3,
      name: "marais",
      description: "Descriptif des marais",
      pics: [
        {
          id: 3,
          slug: "images/habitats/Marais.jpg",
          miniSlug: "x",
          idHabitat: 3
        }
      ]
    }
  ]);
  public habitats$ = this.habitats.asObservable();

  private habitat: BehaviorSubject<IHabitat> = new BehaviorSubject(this.habitats.value[0]);
  public habitat$ = this.habitat.asObservable();

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
  public selectHabitat(id: number) {
    let tmp = this.habitats.value.find((habitat) => habitat.id === id);
    if (tmp) {
      this.habitat.next(tmp);
    }
  }

  constructor() {
  }
}