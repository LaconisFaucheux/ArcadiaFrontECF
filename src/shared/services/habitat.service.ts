import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IHabitat} from "../interfaces/habitat.interface";
import {IAnimal} from "../interfaces/animal.interface";

@Injectable({
  providedIn: 'root'
})
export class HabitatService {
  public habitats$: BehaviorSubject<IHabitat[]> = new BehaviorSubject<IHabitat[]>([
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
  public habitat$: BehaviorSubject<IHabitat> = new BehaviorSubject(this.habitats$.value[0]);

  public selectHabitat(id: number) {
    let tmp = this.habitats$.value.find((habitat) => habitat.id === id);
    if (tmp) {
      this.habitat$.next(tmp);
    }
  }

  constructor() {
  }
}
