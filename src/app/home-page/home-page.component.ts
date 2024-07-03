import {Component} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {BehaviorSubject, Observable, of, Subscription} from "rxjs";
import {IHoraires} from "../../shared/interfaces/horaires.interface";
import {IReview} from "../../shared/interfaces/review.interface";
import {HoraireService} from "../../shared/services/horaire.service";
import {ReviewService} from "../../shared/services/review.service";
import {AsyncPipe, DatePipe, TitleCasePipe} from "@angular/common";
import {IAnimal} from "../../shared/interfaces/animal.interface";
import {AnimalService} from "../../shared/services/animal.service";
import {RouterLink} from "@angular/router";
import {HabitatService} from "../../shared/services/habitat.service";
import {IHabitat} from "../../shared/interfaces/habitat.interface";
import {CharLimiterPipe} from "../../shared/pipes/char-limiter.pipe";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    FooterComponent,
    DatePipe,
    RouterLink,
    TitleCasePipe,
    AsyncPipe,
    CharLimiterPipe
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  public horaires$: Observable<IHoraires[]>;
  public isOpen$: Observable<boolean>;

  public reviews$: Observable<IReview[]>;
  public randomAnimal$: Observable<IAnimal | null>;

  constructor(private horairesService: HoraireService,
              private reviewService: ReviewService,
              protected animalService: AnimalService) {
    this.horaires$ = this.horairesService.horaires$;
    this.isOpen$ = this.horairesService.isOpen$;
    this.randomAnimal$ = this.animalService.randomAnimal$;
    this.reviews$ = this.reviewService.reviews$;
  }

  public getStars(note: number): any[] {
    return new Array(note);
  }

  public getUnStars(note: number): any[] {
    return new Array(5 - note);
  }
}
