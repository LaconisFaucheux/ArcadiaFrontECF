import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IReview} from "../interfaces/review.interface";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviews: BehaviorSubject<IReview[]> = new BehaviorSubject<IReview[]>([
      {
        id: 1,
        pseudo: "Robert de Boron",
        content: "Le parc est agréable, bien ombragé, idéal pour les promenades avec les enfants. D'autre part les animaux y semblent heureux et en bonne santé!",
        isValidated: true,
        note: 5
      },
      {
        id: 10,
        pseudo: "Subaru",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada laoreet tellus at cursus. Phasellus felis est, malesuada eget neque quis, efficitur convallis tellus. Donec pretium sapien at sapien consectetur egestas. Aliquam dignissim malesuada imperdiet. Nulla scelerisque sollicitudin ornare.",
        isValidated: true,
        note: 4
      },
      {
        id: 11,
        pseudo: "Rem",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada laoreet tellus at cursus. Phasellus felis est, malesuada eget neque quis, efficitur convallis tellus. Donec pretium sapien at sapien consectetur egestas. Aliquam dignissim malesuada imperdiet. Nulla scelerisque sollicitudin ornare.",
        isValidated: true,
        note: 4
      },
      {
        id: 12,
        pseudo: "Ram",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada laoreet tellus at cursus. Phasellus felis est, malesuada eget neque quis, efficitur convallis tellus. Donec pretium sapien at sapien consectetur egestas. Aliquam dignissim malesuada imperdiet. Nulla scelerisque sollicitudin ornare.",
        isValidated: true,
        note: 4
      },
      {
        id: 13,
        pseudo: "Roswaal",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada laoreet tellus at cursus. Phasellus felis est, malesuada eget neque quis, efficitur convallis tellus. Donec pretium sapien at sapien consectetur egestas. Aliquam dignissim malesuada imperdiet. Nulla scelerisque sollicitudin ornare.",
        isValidated: true,
        note: 4
      }
    ])
  public reviews$ = this.reviews.asObservable();

  constructor() { }
}
