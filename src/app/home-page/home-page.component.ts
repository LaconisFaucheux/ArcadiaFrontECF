import {Component} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {Observable} from "rxjs";
import {IHoraires} from "../../shared/interfaces/horaires.interface";
import {IReview} from "../../shared/interfaces/review.interface";
import {HoraireService} from "../../shared/services/horaire.service";
import {ReviewService} from "../../shared/services/review.service";
import {AsyncPipe, DatePipe, TitleCasePipe} from "@angular/common";
import {IAnimal} from "../../shared/interfaces/animal.interface";
import {AnimalService} from "../../shared/services/animal.service";
import {RouterLink} from "@angular/router";
import {CharLimiterPipe} from "../../shared/pipes/char-limiter.pipe";
import {IMeteo} from "../../shared/interfaces/meteo.interface";
import {MeteoService} from "../../shared/services/meteo.service";
import {LoadingSpinnerComponent} from "../loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    FooterComponent,
    DatePipe,
    RouterLink,
    TitleCasePipe,
    AsyncPipe,
    CharLimiterPipe,
    LoadingSpinnerComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  public horaires$: Observable<IHoraires[]>;
  public isOpen$: Observable<boolean>;
  public reviews$: Observable<IReview[]>;
  public randomAnimal$: Observable<IAnimal | null>;
  public meteo$: Observable<IMeteo | null>;

  constructor(private horairesService: HoraireService,
              private reviewService: ReviewService,
              protected animalService: AnimalService,
              private meteoService: MeteoService,) {
    this.horaires$ = this.horairesService.horaires$;
    this.isOpen$ = this.horairesService.isOpen$;
    this.randomAnimal$ = this.animalService.randomAnimal$;
    this.reviews$ = this.reviewService.reviews$;
    this.meteo$ = this.meteoService.meteo$;
  }

  ngOnInit() {
    this.animalService.fetchRandomAnimal();
    this.horairesService.fetchData()
    this.reviewService.fetchData()
    this.meteoService.fetchMeteo()
    console.log(this.meteo$)
  }

  public getStars(note: number): any[] {
    return new Array(note);
  }

  public getUnStars(note: number): any[] {
    return new Array(5 - note);
  }

  public getMeteoPic(code: number): string {
    return `assets/meteo/${this.meteoService.weatherCodes[code]}.png`;
  }
}
